import { BadRequestError, MethodNotAllowedError } from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const bookTitle = req.query.bookTitle;
  if (
    !bookTitle ||
    typeof bookTitle !== "string" ||
    bookTitle === "" ||
    bookTitle.trim() === ""
  ) {
    throw new BadRequestError("Provide correct book title");
  }

  const books = await prisma.book.findMany({
    where: {
      title: {
        contains: bookTitle,
        mode: Prisma.QueryMode.insensitive,
      },
    },
    select: {
      id: true,
      title: true,
      author: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
  });

  res.status(200).json({ msg: "Books", books });
}

export default errorMiddleware(handler);
