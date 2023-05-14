import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { BadRequestError, CustomApiError, NotFoundError } from "@/utils/errors";
import { Order } from "@prisma/client";
import { OrderStatus } from "@/types/misc/OrderInfo";

type Data = {
  returnedOrder: Order;
  userOrders: Order[];
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const orderId: string = body.orderId;
  const userId: string = body.userId;

  if (!orderId) {
    throw new BadRequestError("Provide order id");
  }

  if (!userId) {
    throw new BadRequestError("Provide user id");
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
