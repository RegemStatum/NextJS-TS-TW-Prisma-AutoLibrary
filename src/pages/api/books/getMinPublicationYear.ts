import { MethodNotAllowedError, NotFoundError } from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const data = await prisma.book.aggregate({
    _min: {
      publicationYear: true,
    },
  });
  if (!data) {
    throw new NotFoundError("No minimal publication year");
  }

  const minPublicationYear = data._min.publicationYear;
  res.status(200).json({ msg: "Minimal publication year", minPublicationYear });
}

export default errorMiddleware(handler);
