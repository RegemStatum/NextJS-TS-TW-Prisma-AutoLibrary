import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { BadRequestError, CustomApiError } from "@/utils/errors";
import { Order } from "@prisma/client";

type Data = {
  msg: string;
  orders: Order[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const userId: string = body.id;

  if (!userId) {
    throw new BadRequestError("Provide user id");
  }

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

  if (!userOrders) {
    throw new CustomApiError(
      `Something went wrong when receiving user orders. Try again later`
    );
  }

  res
    .status(200)
    .json({ orders: userOrders, msg: `User with id: ${userId} orders` });
}
