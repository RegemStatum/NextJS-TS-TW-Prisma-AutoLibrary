import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";

type Data = {
  currentQuantity: number;
  msg: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const { bookId } = req.query;
  if (!bookId || typeof bookId !== "string") {
    throw new BadRequestError("Please provide correct book id");
  }

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    select: {
      currentQuantity: true,
    },
  });
  if (!book) {
    throw new NotFoundError(`There is no book with id ${bookId}`);
  }

  const currentQuantity = book.currentQuantity;

  res.status(200).json({
    currentQuantity,
    msg: `Book with id ${bookId} has current quantity ${currentQuantity}`,
  });
}

export default errorMiddleware(handler);
