import React, { FC } from "react";
import SidebarLinks from "./SidebarLinks";
import { XMarkIcon } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import Logo from "./Logo";
import Link from "next/link";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { signOut, useSession } from "next-auth/react";
import { SecondaryButton } from "../ui/buttons";

const Sidebar: FC = () => {
  const appContext = useAppContext();
  const { data: session } = useSession();

  const authButton = session ? (
    <div className="w-[205px] mx-auto">
      <SecondaryButton
        onClick={() => {
          appContext.closeSidebar();
          signOut();
        }}
        className="mx-auto text-lg px-[4rem] py-3 shrink-1"
      >
        Sign out
      </SecondaryButton>
    </div>
  ) : (
    <Link href="/auth/signin" className="w-fit mx-auto">
      <PrimaryButton
        onClick={() => appContext.closeSidebar()}
        className="w-fit text-lg px-[4rem] py-3"
      >
        Sign in
      </PrimaryButton>
    </Link>
  );

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
      <div className="h-[calc(100%-60px)] flex gap-9 flex-col justify-center align-center">
        <SidebarLinks />
        {authButton}
      </div>
    </aside>
  );
};

export default Sidebar;
