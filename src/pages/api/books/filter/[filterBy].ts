import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const filterBy = req.query.params;
  if (
    !filterBy ||
    typeof filterBy !== "string" ||
    filterBy === "" ||
    filterBy.trim() === ""
  ) {
    throw new BadRequestError("Provide filter by");
  }

  // filter books with prisma
  const filteredBooks = null;

  // const books = await prisma.book.findMany({
  //   orderBy: [
  //     {
  //       publicationYear: orderPublicationYear,
  //     },
  //   ],
  //   include: {
  //     author: {
  //       select: {
  //         firstName: true,
  //         secondName: true,
  //       },
  //     },
  //   },
  // });

  if (!filteredBooks) {
    throw new NotFoundError("There are no books");
  }

  res.status(200).json({ msg: `Books filtered`, filteredBooks});
}

export default errorMiddleware(handler);
