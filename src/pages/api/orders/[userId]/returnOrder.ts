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
import errorMiddleware from "@/utils/middleware/errorMiddleware";

type Data = {
  returnedOrder: Order;
  userOrders: Order[];
  msg: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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

  // return order only if order status is received
  const orderToReturn = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      status: true,
    },
  });

  if (!orderToReturn) {
    throw new NotFoundError(`There is no order with id ${orderId}`);
  }

  if (orderToReturn.status !== OrderStatus.received) {
    throw new BadRequestError(
      "Only orders with 'received' status can be returned"
    );
  }

  // return order
  const returnedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.returned,
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

  if (!returnedOrder) {
    throw new CustomApiError(`Order with ${orderId} was not returned`);
  }

  const returnedOrderBooksIds = returnedOrder.Book.map((book) => book.id);
  // decrement to books quantity
  await prisma.book.updateMany({
    where: {
      id: {
        in: returnedOrderBooksIds,
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
    returnedOrder,
    userOrders,
    msg: `Order with id ${orderId} was returned`,
  });
}

export default errorMiddleware(handler);
