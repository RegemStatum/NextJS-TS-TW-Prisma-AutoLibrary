import { MethodNotAllowedError, NotFoundError } from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const authors = await prisma.author.findMany({
    select: {
      firstName: true,
      secondName: true,
    },
  });
  if (!authors) {
    throw new NotFoundError("Authors were not found");
  }

  const authorNames = authors.map((author) => {
    const fullName = `${author.firstName} ${author.secondName}`;
    return fullName;
  });

  res.status(200).json({ msg: "Author names", authorNames });
}

export default errorMiddleware(handler);
