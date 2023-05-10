import React, { FC } from "react";
import SidebarLinks from "./SidebarLinks";
import { XMarkIcon } from "../ui/icons";
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
      className={`h-screen py-2 fixed z-10 top-0 overflow-hidden bg-neutral-100 ${
        appContext.isSidebarOpen ? "w-full" : "w-0 p-0 hidden"
      } md:py-3 lg:hidden`}
    >
      <div className="container flex justify-between">
        <Logo />
        <XMarkIcon
          width={30}
          strokeWidth={1.5}
          className="ml-auto mr-[1px] cursor-pointer"
          onClick={appContext.closeSidebar}
        />
      </div>
      <div className="h-[calc(100%-60px)] flex gap-5 flex-col justify-center align-center">
        <SidebarLinks />
        <SidebarShoppingCartLink session={session} />
        <SidebarAuthButton session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;
