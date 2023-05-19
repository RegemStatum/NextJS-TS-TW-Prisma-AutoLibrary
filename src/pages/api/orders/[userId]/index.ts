import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import {
  BadRequestError,
  CustomApiError,
  MethodNotAllowedError,
} from "@/utils/errors";
import { Order } from "@prisma/client";
import errorMiddleware from "@/utils/middleware/errorMiddleware";

type Data = {
  msg: string;
  orders: Order[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    throw new BadRequestError("Provide correct user id");
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

  if (!userOrders) {
    throw new CustomApiError(
      `Something went wrong when receiving user orders. Try again later`
    );
  }

  res
    .status(200)
    .json({ orders: userOrders, msg: `User with id: ${userId} orders` });
}

export default errorMiddleware(handler);
