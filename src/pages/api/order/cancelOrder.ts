import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { BadRequestError, CustomApiError } from "@/utils/errors";
import { Order } from "@prisma/client";

type Data = {
  canceledOrder: Order;
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

  // cancel order
  const canceledOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "canceled",
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
      id: userId,
      status: "ready",
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
