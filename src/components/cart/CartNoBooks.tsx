import Link from "next/link";
import React, { FC } from "react";

const CartNoBooks: FC = () => {
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <h2 className="text-2xl font-medium md:text-3xl">
        No books in your cart
      </h2>
      <Link
        href="/books"
        className="block w-fit mx-auto mt-1 text-lg text-blue-600 underline md:mt-3 md:text-xl"
      >
        Go to all books
      </Link>
    </div>
  );
};

export default CartNoBooks;
