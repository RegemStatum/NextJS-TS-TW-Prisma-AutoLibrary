import React, { FC } from "react";
import Logo from "./Logo";
import { IconWrapper, MagnifyingGlassIcon, MenuBars } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import HeaderLinks from "./HeaderLinks";
import { useSession } from "next-auth/react";
import ShoppingCartLink from "./ShoppingCartLink";
import HeaderAuthButton from "./HeaderAuthButton";
// import TopHeader from "./TopHeader";

const Header: FC = () => {
  const appContext = useAppContext();
  const { data: session } = useSession();

  return (
    <header className="py-3 sticky top-0 z-20  bg-neutral-50 shadow-sm md:py-4 lg:relative lg:py-4">
      <div className="container flex flex-row items-center justify-between">
        {/* logo */}
        <Logo />
        <div className="flex gap-3 items-center lg:hidden">
          {/* search */}
          <div onClick={appContext.openSearchModal}>
            <IconWrapper>
              <MagnifyingGlassIcon width={37} />
            </IconWrapper>
          </div>
          {/* burger menu */}
          <div className="cursor-pointer">
            <IconWrapper onClick={appContext.openSidebar} className="mr-[2px] ">
              <MenuBars />
            </IconWrapper>
          </div>
        </div>
        {/* desktop header */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <HeaderLinks />
          <div className="lg:flex lg:items-center lg:gap-2">
            <div
              className="px-1 py-1 flex gap-5 rounded-md hover:bg-neutral-100 hover:text-blue-500 overflow-hidden cursor-pointer"
              onClick={appContext.openSearchModal}
            >
              <MagnifyingGlassIcon width={32} />
            </div>
            <div className="w-[1px] h-[30px] bg-gray-200 rounded-sm "></div>
            <div className="flex">
              <ShoppingCartLink session={session} />
              <HeaderAuthButton session={session} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
