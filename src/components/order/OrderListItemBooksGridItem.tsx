import { OrderInfoBook } from "@/types/OrderInfo";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  book: OrderInfoBook;
}

const OrderListItemBooksGridItem: FC<Props> = ({ book }) => {
  return (
    <div className="p-2 bg-stone-50 lg:p-4 shadow-sm">
      <div>
        <h4 className="font-medium leading-snug">{book.title}</h4>
        <p>
          {book.author.firstName} {book.author.secondName}
        </p>
        <Link
          href={`/books/${book.id}`}
          className="block mt-1 underline lg:mt-2"
        >
          visit book page
        </Link>
      </div>
      <p className="mt-2 font-medium">
        Cabinet:{" "}
        <span className="inline-block text-lg font-bold lg:mt-3">
          #{book.cabinet?.number}
        </span>
      </p>
    </div>
  );
};

export default OrderListItemBooksGridItem;
