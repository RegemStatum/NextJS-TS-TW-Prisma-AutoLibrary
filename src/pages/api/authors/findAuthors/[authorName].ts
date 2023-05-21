import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const authorName = req.query.authorName;
  if (
    !authorName ||
    typeof authorName !== "string" ||
    authorName === "" ||
    authorName.trim() === ""
  ) {
    throw new BadRequestError("Provide correct author name");
  }
  const splittedAuthorName = authorName.split(" ");

  // const capitalizeWord = (word: string) => {
  //   if (word.length === 0) {
  //     return word;
  //   }
  //   return word.charAt(0).toUpperCase() + word.slice(1);
  // };

  const prismaIsAuthorFirstNameContainsQuery = splittedAuthorName.map(
    (queryPart) => ({
      firstName: {
        contains: queryPart,
        mode: Prisma.QueryMode.insensitive,
      },
    })
  );
  const prismaIsAuthorSecondNameContainsQuery = splittedAuthorName.map(
    (queryPart) => ({
      secondName: {
        contains: queryPart,
        mode: Prisma.QueryMode.insensitive,
      },
    })
  );
  // const prismaIsAuthorFirstNameContainsCapitalizedQuery =
  //   splittedAuthorName.map((queryPart) => ({
  //     firstName: {
  //       contains: capitalizeWord(queryPart),
  //     },
  //   }));
  // const prismaIsAuthorSecondNameContainsCapitalizedQuery =
  //   splittedAuthorName.map((queryPart) => ({
  //     secondName: {
  //       contains: capitalizeWord(queryPart),
  //     },
  //   }));

  const authors = await prisma.author.findMany({
    where: {
      OR: [
        ...prismaIsAuthorFirstNameContainsQuery,
        ...prismaIsAuthorSecondNameContainsQuery,
      ],
    },
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
    throw new NotFoundError("There are no authors");
  }

  res.status(200).json({ msg: "Author has been found", authors });
}

export default errorMiddleware(handler);
