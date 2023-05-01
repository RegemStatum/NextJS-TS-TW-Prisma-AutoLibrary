import Cart from "@/components/cart/Cart";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { FC } from "react";

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
      <Cart />
    </div>
  );
};

export default CartPage;
