import { MethodNotAllowedError, NotFoundError } from "@/utils/errors";
import errorMiddleware from "@/utils/middleware/errorMiddleware";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const data = await prisma.book.findMany({
    select: {
      publisher: true,
    },
    distinct: ["publisher"],
  });
  if (!data) {
    throw new NotFoundError("Publishers not found");
  }

  const publishers = data.map((publisherObj) => publisherObj.publisher);
  res.status(200).json({ msg: "Publishers", publishers });
}

export default errorMiddleware(handler);
