import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { Order } from "@prisma/client";
import {
  MAX_ACTIVE_ORDERS_SIMULTANEOUSLY,
  MAX_BOOKS_IN_ORDER,
} from "@/utils/constants/misc";
import {
  BadRequestError,
  ConflictRequestError,
  CustomApiError,
  NotFoundError,
} from "@/utils/errors";

type Data = {
  order: Order | null;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const booksIds: string[] = body.booksIds;
  const userId: string = body.userId;

  if (!userId || userId.length === 0) {
    throw new BadRequestError("Provide user id");
  }

  if (!booksIds || booksIds.length === 0) {
    throw new BadRequestError("Provide at least one book id");
  }

  if (booksIds.length > MAX_BOOKS_IN_ORDER) {
    return res.status(400).json({
      order: null,
      msg: `Maximum ${MAX_BOOKS_IN_ORDER} books in 1(one) order`,
    });
  }

  const userOrders = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      orders: {
        where: {
          status: "ready",
        },
        select: {
          id: true,
          number: true,
        },
      },
    },
  });

  if (userOrders.orders.length >= MAX_ACTIVE_ORDERS_SIMULTANEOUSLY) {
    return res.status(400).json({
      order: null,
      msg: `Maximum ${MAX_ACTIVE_ORDERS_SIMULTANEOUSLY} active order per user`,
    });
  }

  // check if all books have quantity and available
  const booksIdQuantity = await prisma.book.findMany({
    where: {
      id: {
        in: booksIds,
      },
    },
    select: {
      id: true,
      currentQuantity: true,
      available: true,
    },
  });

  for (let book of booksIdQuantity) {
    if (!book.available) {
      throw new ConflictRequestError(
        `Book with id ${book.id} is not available`
      );
    }
    if (book.currentQuantity <= 0) {
      throw new ConflictRequestError(
        `Book with id ${book.id} has 0 current quantity`
      );
    }
  }

  // get cabinets associated with booksIds
  const connectedCabinetsIds = await prisma.cabinet.findMany({
    select: {
      id: true,
    },
    where: {
      bookId: {
        in: booksIds,
      },
    },
  });

  if (
    !connectedCabinetsIds ||
    connectedCabinetsIds.length === 0 ||
    connectedCabinetsIds.length !== booksIds.length
  ) {
    throw new NotFoundError(
      "There are no corresponding cabinets for all of provided books"
    );
  }

  const connectedBooksIds = booksIds.map((bookId) => ({ id: bookId }));
  const newOrder = await prisma.order.create({
    data: {
      status: "ready",
      userId: userId,
      Book: {
        connect: connectedBooksIds,
      },
      Cabinet: {
        connect: connectedCabinetsIds,
      },
    },
  });

  // subtract from books quantity
  await prisma.book.updateMany({
    where: {
      id: {
        in: booksIds,
      },
    },
    data: {
      currentQuantity: {
        decrement: 1,
      },
    },
  });

  res
    .status(201)
    .json({ order: newOrder, msg: "New order successfully created" });
}
