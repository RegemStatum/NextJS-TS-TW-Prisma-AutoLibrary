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
      language: true,
    },
    distinct: ["language"],
  });
  if (!data) {
    throw new NotFoundError("Languages not found");
  }

  const languages = data.map((languageObj) => languageObj.language);
  res.status(200).json({ msg: "Languages", languages });
}

export default errorMiddleware(handler);
