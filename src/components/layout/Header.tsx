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
    <header className="container mb-4 py-2 sticky top-0 z-10 flex flex-row items-center justify-between bg-neutral-50 border-b md:mb-5 md:py-4 lg:relative lg:mb-6 lg:py-4">
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
