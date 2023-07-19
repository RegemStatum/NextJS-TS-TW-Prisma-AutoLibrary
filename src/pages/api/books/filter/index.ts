import { MethodNotAllowedError, NotFoundError } from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  // set filter options
  let { author, publishers, available, featured } = req.query;

  if (typeof publishers === "string") publishers = [publishers];

  type FilterOptions = {
    author?: {
      firstName: string;
      secondName: string;
    };
    publisher?: {
      in: string[];
    };
    available?: boolean;
    featured?: boolean;
  };

  const filterOptions: FilterOptions = {};

  if (author && typeof author === "string" && author !== "") {
    const [firstName, secondName] = author.split(" ");
    filterOptions.author = { firstName, secondName };
  }
  if (publishers && typeof publishers === "object" && publishers.length !== 0)
    filterOptions.publisher = { in: publishers };
  if (available && typeof available === "string")
    filterOptions.available = Boolean(Number(available));
  if (featured && typeof featured === "string")
    filterOptions.featured = Boolean(Number(featured));

  // filter books with prisma
  const filteredBooks = await prisma.book.findMany({
    where: filterOptions,
    include: {
      author: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
  });

  if (!filteredBooks) {
    throw new NotFoundError("There are no books");
  }

  res.status(200).json({ msg: `Books filtered`, filteredBooks });
}

export default errorMiddleware(handler);
