import Cart from "@/components/cart/Cart";
import Head from "next/head";
import React, { FC } from "react";

const CartPage: FC = () => {
  return (
    <>
      <Head>
        <title>Auto Library | Cart</title>
        <meta name="description" content="Auto Library cart page" />
      </Head>
      <div className="page-min-height">
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
