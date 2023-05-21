// import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import { BooksStateSort } from "@/types/reducers/BooksReducer";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const isBooksStateSort = (sortBy: string): sortBy is BooksStateSort => {
  return sortBy === "YEAR_ASC" || sortBy === "YEAR_DESC";
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const sortBy = req.query.sortBy;
  if (
    !sortBy ||
    typeof sortBy !== "string" ||
    sortBy === "" ||
    sortBy.trim() === ""
  ) {
    throw new BadRequestError("Provide sort by");
  }

  if (!isBooksStateSort(sortBy)) {
    throw new BadRequestError("Sort by can be 'YEAR_ASC' or 'YEAR_DESC'");
  }

  const orderPublicationYear: "asc" | "desc" =
    sortBy === "YEAR_ASC" ? "asc" : "desc";

  const books = await prisma.book.findMany({
    orderBy: [
      {
        publicationYear: orderPublicationYear,
      },
    ],
    include: {
      author: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
  });

  if (!books) {
    throw new NotFoundError("There are no books");
  }

  res.status(200).json({ msg: `Books sorted by ${sortBy}`, books });
}

export default errorMiddleware(handler);
