import { OrderInfoBook } from "@/types/misc/OrderInfo";
import React, { FC } from "react";

interface Props {
  book: OrderInfoBook;
}

const OrderGridItemBooksGridItem: FC<Props> = ({ book }) => {
  return (
    <div className="p-4 bg-neutral-100 bg-opacity-30 border rounded-md shadow-sm">
      <div>
        <h4 className="font-medium leading-snug md:min-h-[44px] lg:min-h-0">
          {book.title}
        </h4>
        <p className="mt-1">
          {book.author.firstName} {book.author.secondName}
        </p>
      </div>
      {book.cabinet && (
        <p className="mt-2 font-medium lg:mt-4">
          Cabinet:{" "}
          <span className="inline-block text-lg font-bold text-blue-800">
            #{book.cabinet?.number}
          </span>
        </p>
      )}
    </div>
  );
};

export default OrderGridItemBooksGridItem;
