import { useCartContext } from "@/context/CartContext";
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
  const cartContext = useCartContext();

  return (
    <div className="page-min-height">
      <h1>Ordered books</h1>
      {cartContext.cartBooksIds.map((id) => (
        <p key={id}>Book in cart with id: {id}</p>
      ))}
    </div>
  );
};

export default CartPage;
