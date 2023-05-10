import React, { FC } from "react";
import Logo from "./Logo";
import { MenuBars } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import HeaderLinks from "./HeaderLinks";
import { useSession } from "next-auth/react";
import ShoppingCartLink from "./ShoppingCartLink";
import HeaderAuthButton from "./HeaderAuthButton";

const Header: FC = () => {
  const appContext = useAppContext();
  const { data: session } = useSession();

  return (
    <header className="container mb-2 py-2 sticky top-0 z-10 flex flex-row items-center justify-between bg-neutral-50 border-b lg:relative md:mb-3 md:py-3">
      <Logo />
      <MenuBars
        onClick={appContext.openSidebar}
        className="mr-[2px] cursor-pointer lg:hidden"
      />
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <HeaderLinks />
        <div className="lg:flex lg:gap-2">
          <ShoppingCartLink session={session} />
          <HeaderAuthButton session={session} />
        </div>
      </div>
    </header>
  );
};

export default Header;
