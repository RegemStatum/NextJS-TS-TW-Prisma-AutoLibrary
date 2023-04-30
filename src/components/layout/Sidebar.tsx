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
      className={`absolute z-10 py-4 h-screen top-0 bg-stone-100 ${
        appContext.isSidebarOpen ? "w-full" : "w-0 p-0 hidden"
      }  lg:hidden`}
    >
      <div className="container flex justify-between">
        <Logo />
        <XMarkIcon
          width={42}
          className="ml-auto"
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
