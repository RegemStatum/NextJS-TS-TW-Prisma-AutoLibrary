import { NextApiRequest, NextApiResponse } from "next";
import { BOOKS_PER_PAGE } from "@/utils/constants/misc";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import checkIsBooksStateSort from "@/utils/helpers/checkIsBooksStateSort";

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

  if (!checkIsBooksStateSort(sortBy)) {
    throw new BadRequestError("Sort by can be 'YEAR_ASC' or 'YEAR_DESC'");
  }

  const pageNumber = req.query.pageNumber;
  if (!pageNumber || pageNumber === "" || typeof pageNumber !== "string") {
    throw new BadRequestError("Provide correct page number");
  }

  const response = await fetch(
    `${process.env.BASE_URL}/api/books/sort/${sortBy}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  const books = data.books;
  if (!books || books.length === 0) {
    throw new NotFoundError("There are no books");
  }

  const indexToStartWith = (Number(pageNumber) - 1) * BOOKS_PER_PAGE;
  const indexToEndWith = indexToStartWith + BOOKS_PER_PAGE;
  const booksOnPage = books.slice(indexToStartWith, indexToEndWith);

  res.status(200).json({
    msg: `Books on page ${pageNumber}`,
    books: booksOnPage,
    totalBooksAmount: books.length,
  });
}

export default errorMiddleware(handler);
