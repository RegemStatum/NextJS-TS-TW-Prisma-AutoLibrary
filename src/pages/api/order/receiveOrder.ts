import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { BadRequestError, CustomApiError, NotFoundError } from "@/utils/errors";
import { Order } from "@prisma/client";
import { OrderStatus } from "@/types/misc/OrderInfo";

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

  // receive order only if order status is ready
  const orderToReceive = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      status: true,
    },
  });

  if (!orderToReceive) {
    throw new NotFoundError(`There is no order with id ${orderId}`);
  }

  if (orderToReceive.status !== OrderStatus.ready) {
    throw new BadRequestError(
      "Only orders with 'ready' status can be received"
    );
  }

  // receive order
  const receivedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.received,
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
