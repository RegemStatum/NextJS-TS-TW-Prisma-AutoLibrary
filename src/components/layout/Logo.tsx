import React, { FC } from "react";
import { LogoBookIcon } from "../ui/icons";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const Logo: FC = () => {
  const appContext = useAppContext();

  return (
    <Link
      href="/"
      onClick={appContext.closeSidebar}
      className="hover:text-sky-500"
    >
      <div className="flex items-center gap-2">
        <LogoBookIcon width={42} />
        <h2 className="font-black text-3xl hidden tracking-wide lg:block">
          AutoLibrary
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
