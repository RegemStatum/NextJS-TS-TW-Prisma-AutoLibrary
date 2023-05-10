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
        className={`group w-fit mx-auto flex gap-3 hover:text-blue-500 ${
          !session?.user
            ? "pointer-events-none text-neutral-400 items-center"
            : ""
        }`}
        onClick={() => {
          setTimeout(() => {
            appContext.closeSidebar();
          }, 300);
        }}
      >
        <div
          className={`w-[32px] h-[32px] p-0 group inline-block relative rounded-md shrink-0 hover:bg-neutral-100  hover:text-blue-500 `}
        >
          <ShoppingBagIcon />
          <ShoppingCartLinkCounter className="w-4 h-4 -bottom-[4px] -right-[2px] group-hover:text-neutral-100" />
          {!session?.user && (
            <div className="w-[100px] opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-10 left-1/2 -translate-x-1/2 mt-3 py-2 px-3 rounded-md text-sm bg-neutral-600 text-white text-center ">
              Sign in to access cart
            </div>
          )}
        </div>
        <p
          className={`w-[100px] font-medium text-2xl leading-tight ${
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
