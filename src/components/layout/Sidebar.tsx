import React, { FC } from "react";
import SidebarLinks from "./SidebarLinks";
import { IconWrapper, XMarkIcon } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import SidebarShoppingCartLink from "./SidebarShoppingCartLink";
import SidebarAuthButton from "./SidebarAuthButton";

const Sidebar: FC = () => {
  const appContext = useAppContext();
  const { data: session } = useSession();

  return (
    <aside
      className={`h-screen py-3 fixed z-20 top-0 overflow-hidden bg-neutral-100 ${
        appContext.isSidebarOpen ? "w-full" : "w-0 p-0 hidden"
      } md:py-4 lg:hidden`}
    >
      <div className="container flex justify-between">
        <Logo />
        <IconWrapper
          className="flex items-centerml-auto mr-[1px] cursor-pointer"
          onClick={appContext.closeSidebar}
        >
          <XMarkIcon width={37} strokeWidth={1.75} />
        </IconWrapper>
      </div>
      <div className="h-[calc(100%-60px)] w-[190px] mx-auto flex gap-1 flex-col justify-center align-center">
        <SidebarLinks />
        <SidebarShoppingCartLink session={session} />
        <SidebarAuthButton session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;
