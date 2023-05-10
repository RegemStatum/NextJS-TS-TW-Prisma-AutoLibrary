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
      } absolute flex items-center justify-center bg-blue-500 rounded-md select-none cursor-pointer ${
        className ?? ""
      }`}
    >
      <p className="text-sm font-medium group-hover:text-neutral-100 ">
        {cartContext.cartBooksIds.length}
      </p>
    </div>
  );
};

export default ShoppingCartLinkCounter;
