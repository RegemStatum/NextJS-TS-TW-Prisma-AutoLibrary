import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { BadRequestError, CustomApiError } from "@/utils/errors";
import { Order } from "@prisma/client";

type Data = {
  receivedOrder: Order;
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

  // Warning receive order only if order status is ready and not cancelled

  // receive order
  const receivedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "received",
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

  if (!receivedOrder) {
    throw new CustomApiError(`Order with ${orderId} was not received`);
  }

  const receivedOrderBooksIds = receivedOrder.Book.map((book) => book.id);
  // decrement to books quantity
  await prisma.book.updateMany({
    where: {
      id: {
        in: receivedOrderBooksIds,
      },
    },
    data: {
      currentQuantity: {
        decrement: 1,
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
    receivedOrder,
    userOrders,
    msg: `Order with id ${orderId} was received`,
  });
}
