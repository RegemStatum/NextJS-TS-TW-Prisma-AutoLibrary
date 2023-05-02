import Link from "next/link";
import React, { FC } from "react";

const CartNoBooks: FC = () => {
  return (
    <div className="pt-4">
      <h2 className="text-xl font-medium lg:text-3xl">
        There are no books yet
      </h2>
      <Link
        href="/books"
        className="pt-1 text-normal text-blue-600 underline lg:pt-2 lg:text-xl"
      >
        Add books to your cart
      </Link>
    </div>
  );
};

export default CartNoBooks;
