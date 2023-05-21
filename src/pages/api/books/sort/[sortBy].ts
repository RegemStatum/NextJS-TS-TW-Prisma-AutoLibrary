import { CACHED_BOOKS_TTL_SEC } from "@/utils/constants/misc";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import checkIsBooksStateSort from "@/utils/helpers/checkIsBooksStateSort";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

const cache = new NodeCache();

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

  // return cached books if cache hit
  type CachedBooksKey = "booksSortedByYearASC" | "booksSortedByYearDESC";
  const cachedBooksKey: CachedBooksKey =
    sortBy === "YEAR_ASC" ? "booksSortedByYearASC" : "booksSortedByYearDESC";

  const cachedBooks = cache.get(cachedBooksKey);
  if (cachedBooks) {
    res
      .status(200)
      .json({ msg: `Books sorted by ${sortBy}`, books: cachedBooks });
    return;
  }

  type OrderPublicationYear = "asc" | "desc";
  const orderPublicationYear: OrderPublicationYear =
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

  // cache books if cache miss
  const booksCacheSuccess = cache.set(
    cachedBooksKey,
    books,
    CACHED_BOOKS_TTL_SEC
  );
  if (!booksCacheSuccess) {
    console.log("Books were not cached");
  }

  res.status(200).json({ msg: `Books sorted by ${sortBy}`, books });
}

export default errorMiddleware(handler);
