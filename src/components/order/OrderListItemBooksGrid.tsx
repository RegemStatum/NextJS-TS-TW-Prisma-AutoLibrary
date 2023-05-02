import { OrderInfoBook } from "@/types/OrderInfo";
import React, { FC } from "react";
import OrderListItemBooksGridItem from "./OrderListItemBooksGridItem";

interface Props {
  books: OrderInfoBook[];
}

const OrderListItemsBooksGrid: FC<Props> = ({ books }) => {
  return (
    <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <OrderListItemBooksGridItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default OrderListItemsBooksGrid;
