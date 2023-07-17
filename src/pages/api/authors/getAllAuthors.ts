import { CACHED_AUTHORS_TTL_SEC } from "@/utils/constants/misc";
import { MethodNotAllowedError, NotFoundError } from "@/utils/errors";
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

  const cachedAuthors = cache.get("authors");
  if (cachedAuthors) {
    res.status(200).json({ msg: "Authors", authors: cachedAuthors });
    return;
  }

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
  });
  if (!authors) {
    throw new NotFoundError("Authors were not found");
  }

  const authorsToJson = authors.map((author) => {
    const newAuthor = {
      ...author,
      birthDate: JSON.stringify(author.birthDate),
      deathDate: JSON.stringify(author.deathDate),
    };
    return newAuthor;
  });

  const isAuthorsSuccessfullyCached = cache.set(
    "authors",
    authorsToJson,
    CACHED_AUTHORS_TTL_SEC
  );
  if (!isAuthorsSuccessfullyCached) {
    console.log("Authors were not successfully cached");
  }

  res.status(200).json({ msg: "Authors", authors: authorsToJson });
}

export default errorMiddleware(handler);
