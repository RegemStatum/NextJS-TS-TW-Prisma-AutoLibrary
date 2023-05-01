import CartList from "@/components/cart/CartList";
import { useCartContext } from "@/context/CartContext";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { FC, useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

const CartPage: FC = () => {
  return (
    <div className="page-min-height">
      <CartList />
    </div>
  );
};

export default CartPage;
