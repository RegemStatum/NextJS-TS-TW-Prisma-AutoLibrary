import React, { FC } from "react";
import SidebarLinks from "./SidebarLinks";
import { XMarkIcon } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import Logo from "./Logo";

const Sidebar: FC = () => {
  const appContext = useAppContext();

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
      <SidebarLinks />
    </aside>
  );
};

export default Sidebar;
