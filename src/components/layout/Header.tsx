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
    <header className="container py-4 flex flex-row items-center justify-between lg:py-8">
      <Logo />
      <MenuBars
        width={42}
        onClick={appContext.openSidebar}
        className="lg:hidden"
      />
      <div className="hidden lg:flex items-center gap-4">
        <HeaderLinks />
        <div className="ml-4 space-x-2 lg:flex">
          <ShoppingCartLink session={session} />
          <HeaderAuthButton session={session} />
        </div>
      </div>
    </header>
  );
};

export default Header;
