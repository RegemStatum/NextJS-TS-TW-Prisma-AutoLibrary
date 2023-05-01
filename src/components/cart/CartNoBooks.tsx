import React, { FC } from "react";

const CartNoBooks: FC = () => {
  return (
    <div className="pt-4">
      <h2 className="text-xl font-medium lg:text-3xl">
        There are no books yet
      </h2>
      <p className="pt-1 text-normal lg:pt-2 lg:text-xl">
        Add books to your cart
      </p>
    </div>
  );
};

export default CartNoBooks;
