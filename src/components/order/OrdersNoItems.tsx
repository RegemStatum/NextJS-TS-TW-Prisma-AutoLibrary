import Link from "next/link";
import React, { FC } from "react";

const OrdersNoItems: FC = () => {
  return (
    <div className="leading-snug">
      <h2 className="text-lg leading-snug lg:text-xl">
        You have no active orders yet
      </h2>
      <Link
        href="/cart"
        className="text-lg text-blue-600 leading-snug underline lg:pt-2 lg:text-xl"
      >
        Check out cart
      </Link>
    </div>
  );
};

export default OrdersNoItems;
