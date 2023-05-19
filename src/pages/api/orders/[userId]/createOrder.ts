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
  MethodNotAllowedError,
  NotFoundError,
} from "@/utils/errors";
import { OrderStatus } from "@/types/misc/OrderInfo";
import errorMiddleware from "@/utils/middleware/errorMiddleware";

type Data = {
  order: Order | null;
  msg: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const reqMethod = req.method;
  if (reqMethod !== "POST") {
    throw new MethodNotAllowedError("Method not allowed");
  }

  const booksIds: string[] = req.body.booksIds;
  const userId = req.query.userId;

  if (!userId || typeof userId !== "string") {
    throw new BadRequestError("Provide correct user id");
  }

  if (!booksIds || booksIds.length === 0) {
    throw new BadRequestError("Provide at least one book id");
  }

  if (booksIds.length > MAX_BOOKS_IN_ORDER) {
    throw new BadRequestError(
      `Maximum ${MAX_BOOKS_IN_ORDER} books in 1(one) order`
    );
  }

  const userOrders = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      orders: {
        where: {
          status: OrderStatus.ready || OrderStatus.received,
        },
        select: {
          id: true,
          number: true,
        },
      },
    },
  });

  if (userOrders.orders.length >= MAX_ACTIVE_ORDERS_SIMULTANEOUSLY) {
    throw new BadRequestError(
      `Maximum ${MAX_ACTIVE_ORDERS_SIMULTANEOUSLY} active (ready or received) order`
    );
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
      status: OrderStatus.ready,
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

export default errorMiddleware(handler);
