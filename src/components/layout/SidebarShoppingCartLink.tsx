import Link from "next/link";
import React, { FC } from "react";
import { Session } from "next-auth";
import { ShoppingBagIcon } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import ShoppingCartLinkCounter from "./ShoppingCartLinkCounter";

interface Props {
  session: Session | null;
}

const SidebarShoppingCartLink: FC<Props> = ({ session }) => {
  const appContext = useAppContext();

  return (
    <div className="mx-auto ">
      <Link
        href="/cart"
        className={`flex gap-3 ${
          !session?.user
            ? "pointer-events-none text-stone-400 items-center"
            : ""
        }`}
        onClick={() => {
          setTimeout(() => {
            appContext.closeSidebar();
          }, 300);
        }}
      >
        <div
          className={`w-[32px] h-[32px] p-0 group inline-block relative rounded-sm shrink-0 hover:bg-stone-100  hover:text-sky-500 `}
        >
          <ShoppingBagIcon />
          <ShoppingCartLinkCounter className="absolute w-4 h-4 -bottom-[4px] -right-[4px]" />
          {!session?.user && (
            <div className="w-[100px] opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-10 left-1/2 -translate-x-1/2 mt-3 py-2 px-3 rounded-sm text-sm bg-stone-600 text-white text-center ">
              Sign in to access cart
            </div>
          )}
        </div>
        <p
          className={`w-[100px] font-medium text-2xl ${
            !session?.user ? "text-lg" : ""
          }`}
        >
          {!session?.user ? "Sign in to access cart" : "Cart"}
        </p>
      </Link>
    </div>
  );
};

export default SidebarShoppingCartLink;
