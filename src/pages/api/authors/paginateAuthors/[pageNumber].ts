import { NextApiRequest, NextApiResponse } from "next";
import { AUTHORS_PER_PAGE } from "@/utils/constants/misc";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const pageNumber = req.query.pageNumber;
  if (!pageNumber || pageNumber === "" || typeof pageNumber !== "string") {
    throw new BadRequestError("Provide correct page number");
  }
  const typedPageNumber = Number(pageNumber);

  const authors = await prisma.author.findMany({
    include: {
      books: {
        where: {
          featured: true,
        },
        select: {
          title: true,
          bookImgUrl: true,
          available: true,
          id: true,
        },
      },
    },
    skip: (typedPageNumber - 1) * AUTHORS_PER_PAGE,
    take: AUTHORS_PER_PAGE,
  });
  if (!authors || authors.length === 0) {
    throw new NotFoundError("There are no authors");
  }

  res.status(200).json({ msg: `Authors on page ${pageNumber}`, authors });
}

export default errorMiddleware(handler);
