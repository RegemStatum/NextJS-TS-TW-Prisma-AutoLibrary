import Link from "next/link";
import React, { FC } from "react";

const OrdersNoItems: FC = () => {
  return (
    <div>
      <h2 className="text-xl font-medium">There are no orders yet</h2>
      <Link
        href="/cart"
        className="pt-1 text-normal text-blue-600 underline  lg:pt-2 lg:text-xl"
      >
        Check out cart
      </Link>
    </div>
  );
};

export default OrdersNoItems;
