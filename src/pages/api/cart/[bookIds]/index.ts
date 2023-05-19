import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import CartBook from "@/types/misc/CartBook";
import { MethodNotAllowedError } from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";

type Data = {
  cartBooks: CartBook[];
  msg: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  let cartBooksIds = req.query.bookIds;
  if (!cartBooksIds || typeof cartBooksIds !== "string") {
    throw new Error("Please provide cart books ids");
  }
  cartBooksIds = cartBooksIds.split(",");

  const cartBooks = await prisma.book.findMany({
    where: {
      id: { in: cartBooksIds },
    },
    select: {
      id: true,
      bookImgUrl: true,
      title: true,
      author: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
  });

  res.status(200).json({ cartBooks, msg: "Books in cart" });
}

export default errorMiddleware(handler);
