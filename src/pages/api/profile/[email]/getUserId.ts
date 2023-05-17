import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = req.method;
  if (reqMethod !== "GET") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const { email } = req.query;
  if (!email || typeof email !== "string") {
    throw new BadRequestError("Provide correct user id");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new NotFoundError(`Cannot find user with email: ${email}`);
  }

  res.status(200).json({
    id: user.id,
    msg: `User with email: ${email} has id: ${user.id}`,
  });
}
