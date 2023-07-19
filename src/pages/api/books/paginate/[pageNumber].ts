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

  let { author, publisher, available, featured } = req.query;

  if (typeof publisher === "string") publisher = [publisher];

  // configure filter params in uri
  const filterParams: string[] = [];

  if (author && author !== "") {
    filterParams.push(`author=${author}`);
  }
  if (publisher && publisher.length !== 0) {
    for (let p of publisher) {
      filterParams.push(`publisher=${p}`);
    }
  }
  if (available) {
    filterParams.push(`available=${Number(available)}`);
  }
  if (featured) {
    filterParams.push(`featured=${Number(featured)}`);
  }

  const filterParamsURI = filterParams.join("&");
  const queryURI = `${process.env.BASE_URL}/api/books?sortBy=${sortBy}&${
    filterParamsURI.length !== 0 ? filterParamsURI : ""
  }`;

  const response = await fetch(queryURI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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
