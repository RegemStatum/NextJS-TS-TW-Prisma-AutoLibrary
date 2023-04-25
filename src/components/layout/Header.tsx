import React, { FC } from "react";
import Logo from "./Logo";
import { MenuBars } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import HeaderLinks from "./HeaderLinks";

const Header: FC = () => {
  const appContext = useAppContext();

  return (
    <header className="container py-4 flex flex-row items-center justify-between lg:py-8">
      <Logo />
      <MenuBars
        width={42}
        onClick={appContext.openSidebar}
        className="lg:hidden"
      />
      <HeaderLinks />
    </header>
  );
};

export default Header;
