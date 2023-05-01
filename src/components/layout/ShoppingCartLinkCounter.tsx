import { useCartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import React, { FC } from "react";

type Props = {
  className?: string;
};

const ShoppingCartLinkCounter: FC<Props> = ({ className }) => {
  const cartContext = useCartContext();
  const { data: session } = useSession();

  return (
    <div
      className={`${
        !session ? "hidden" : ""
      } absolute flex items-center justify-center bg-sky-500 rounded-sm select-none cursor-pointer ${
        className ?? ""
      }`}
    >
      <p className="font-bold group-hover:text-stone-100 ">
        {cartContext.cartBooksIds.length}
      </p>
    </div>
  );
};

export default ShoppingCartLinkCounter;
