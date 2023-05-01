import { Session } from "next-auth";
import Link from "next/link";
import React, { FC } from "react";
import { ShoppingBagIcon } from "../ui/icons";
import ShoppingCartLinkCounter from "./ShoppingCartLinkCounter";

interface Props {
  session: Session | null;
  className?: string;
}

const ShoppingCartLink: FC<Props> = ({ session, className }) => {
  return (
    <div className="group">
      <Link
        href="/cart"
        className={`w-[48px] h-[48px] p-1 inline-block relative rounded-sm shrink-0 hover:bg-stone-100  hover:text-sky-500 ${
          !session?.user ? "pointer-events-none text-stone-400" : ""
        } ${className}`}
      >
        <ShoppingBagIcon />
        <ShoppingCartLinkCounter className="w-5 h-5 right-[5px] bottom-[2px]" />
        {!session?.user && (
          <div className="w-[100px] opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-10 left-1/2 -translate-x-1/2 mt-3 py-2 px-3 rounded-sm text-sm bg-stone-600 text-white text-center ">
            Sign in to access cart
          </div>
        )}
      </Link>
    </div>
  );
};

export default ShoppingCartLink;
