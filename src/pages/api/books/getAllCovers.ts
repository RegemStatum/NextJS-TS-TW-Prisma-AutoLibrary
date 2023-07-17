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
      cover: true,
    },
    distinct: ["cover"],
  });
  if (!data) {
    throw new NotFoundError("Covers not found");
  }

  const covers = data.map((coverObj) => coverObj.cover);
  res.status(200).json({ msg: "Covers", covers });
}

export default errorMiddleware(handler);
