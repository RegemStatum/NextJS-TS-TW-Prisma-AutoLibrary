import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import CartBook from "@/types/CartBook";

type Data = {
  cartBooks: CartBook[];
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cartBooksIds = req.body.cartBooksIds;

  if (!cartBooksIds) {
    throw new Error("Please provide cart books ids");
  }

  const cartBooks =
    (await prisma.book.findMany({
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
    })) || [];

  res.status(200).json({ cartBooks, msg: "Books found" });
}
