import { NextApiRequest, NextApiResponse } from "next";
import { AUTHORS_PER_PAGE } from "@/utils/constants/misc";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const pageNumber = req.query.pageNumber;
  if (!pageNumber || pageNumber === "" || typeof pageNumber !== "string") {
    throw new BadRequestError("Provide correct page number");
  }

  const authorName = req.query.authorName;
  const fetchUri = authorName
    ? `${process.env.BASE_URL}/api/authors/findAuthors/${authorName}`
    : `${process.env.BASE_URL}/api/authors/getAllAuthors`;

  const response = await fetch(fetchUri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const authors = data.authors;

  if (!authors || authors.length === 0) {
    throw new NotFoundError("No authors found");
  }

  const indexToStartWith = (Number(pageNumber) - 1) * AUTHORS_PER_PAGE;
  const indexToEndWith = indexToStartWith + AUTHORS_PER_PAGE;
  const authorsOnPage = authors.slice(indexToStartWith, indexToEndWith);

  res.status(200).json({
    msg: `Authors on page ${pageNumber}`,
    authors: authorsOnPage,
    totalAuthorsAmount: authors.length,
  });
}

export default errorMiddleware(handler);
