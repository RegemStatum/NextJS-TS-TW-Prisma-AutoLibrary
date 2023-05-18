import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import {
  BadRequestError,
  CustomApiError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import { Order } from "@prisma/client";
import { OrderStatus } from "@/types/misc/OrderInfo";

type Data = {
  canceledOrder: Order;
  userOrders: Order[];
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const reqMethod = req.method;
  if (reqMethod !== "PUT") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const orderId: string = req.body.orderId;
  const userId = req.query.userId;

  if (!userId || typeof userId !== "string") {
    throw new BadRequestError("Provide correct user id");
  }

  if (!orderId) {
    throw new BadRequestError("Provide order id");
  }

  // cancel order only if order status is ready
  const orderToCancel = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      status: true,
    },
  });

  if (!orderToCancel) {
    throw new NotFoundError(`There is no order with id ${orderId}`);
  }

  if (orderToCancel.status !== OrderStatus.ready) {
    throw new BadRequestError(
      "Only orders with 'ready' status can be canceled"
    );
  }

  // cancel order
  const canceledOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.canceled,
      updatedAt: new Date().toISOString(),
    },
    select: {
      id: true,
      number: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      Book: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!canceledOrder) {
    throw new CustomApiError(`Order with ${orderId} was not canceled`);
  }

  const canceledOrderBooksIds = canceledOrder.Book.map((book) => book.id);
  // increment to books quantity
  await prisma.book.updateMany({
    where: {
      id: {
        in: canceledOrderBooksIds,
      },
    },
    data: {
      currentQuantity: {
        increment: 1,
      },
    },
  });

  const userOrders = await prisma.order.findMany({
    where: {
      userId,
      status: {
        in: ["ready", "received"],
      },
    },
    select: {
      id: true,
      number: true,
      status: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      Book: {
        select: {
          id: true,
          title: true,
          author: {
            select: {
              firstName: true,
              secondName: true,
            },
          },
          cabinet: {
            select: {
              id: true,
              number: true,
              isEmpty: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({
    canceledOrder,
    userOrders,
    msg: `Order with id ${orderId} was canceled`,
  });
}
