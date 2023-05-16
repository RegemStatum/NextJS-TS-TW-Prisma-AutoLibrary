import React, { FC } from "react";
// import { LogoBookIcon } from "../ui/icons";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const Logo: FC = () => {
  const appContext = useAppContext();

  return (
    <Link href="/" onClick={appContext.closeSidebar} className="group">
      <div className="flex items-center ">
        {/* <div className="w-[40px] p-1">
          <LogoBookIcon strokeWidth={1.3} className="text-neutral-800" />
        </div> */}
        <h2 className="inline-block pl-1 text-xl font-medium text-neutral-800 tracking-wide">
          autolib
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
