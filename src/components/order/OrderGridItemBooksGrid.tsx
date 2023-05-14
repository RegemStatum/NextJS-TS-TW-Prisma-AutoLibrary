import { OrderInfoBook } from "@/types/misc/OrderInfo";
import React, { FC } from "react";
import OrderGridItemBooksGridItem from "./OrderGridItemBooksGridItem";

interface Props {
  books: OrderInfoBook[];
}

const OrderGridItemsBooksGrid: FC<Props> = ({ books }) => {
  return (
    <div className="grid gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-1">
      {books.map((book) => (
        <OrderGridItemBooksGridItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default OrderGridItemsBooksGrid;
