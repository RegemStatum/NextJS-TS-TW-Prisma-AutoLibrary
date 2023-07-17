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
    _max: {
      publicationYear: true,
    },
  });
  if (!data) {
    throw new NotFoundError("No maximal publication year");
  }

  const maxPublicationYear = data._max.publicationYear;
  res.status(200).json({ msg: "Maximal publication year", maxPublicationYear });
}

export default errorMiddleware(handler);
