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
        className={`w-[40px] h-[40px] block p-1  relative rounded-md shrink-0 hover:bg-neutral-100  hover:text-blue-500 ${
          !session?.user ? "pointer-events-none text-neutral-400" : ""
        } ${className}`}
      >
        <ShoppingBagIcon strokeWidth={1.3} />
        <ShoppingCartLinkCounter className="w-4 h-4 right-[5px] bottom-[2px]" />
        {!session?.user && (
          <div className="w-[100px] opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-10 left-1/2 -translate-x-1/2 mt-3 py-1 px-2 rounded-md text-sm bg-neutral-500 leading-tight text-white text-center ">
            <div className="absolute bottom-[39px]  left-1/2 -translate-x-1/2 w-7 overflow-hidden inline-block">
              <div className="h-5 w-5 bg-neutral-500 rotate-45 transform origin-bottom-left"></div>
            </div>
            <p>Sign in to access cart</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ShoppingCartLink;
