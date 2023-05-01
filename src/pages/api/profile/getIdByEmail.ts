import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import CartBook from "@/types/CartBook";
import { BadRequestError, NotFoundError } from "@/utils/errors";

type Data = {
  id: string;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const email: string = body.email;

  if (!email) {
    throw new BadRequestError("Provide user email");
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

  const id = user.id;

  res.status(200).json({ id, msg: `User with email: ${email} has id: ${id}` });
}
