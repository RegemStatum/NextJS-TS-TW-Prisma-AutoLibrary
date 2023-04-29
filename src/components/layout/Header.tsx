import React, { FC, useEffect } from "react";
import Logo from "./Logo";
import { MenuBars } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import HeaderLinks from "./HeaderLinks";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: FC = () => {
  const appContext = useAppContext();
  const { data: session } = useSession();

  const authButton = session ? (
    <SecondaryButton
      onClick={() => signOut()}
      className="w-fit lg:px-6 lg:py-[10px]"
    >
      Sign out
    </SecondaryButton>
  ) : (
    <Link href="/auth/signin">
      <PrimaryButton className="w-fit lg:px-6 lg:py-3">Sign in</PrimaryButton>
    </Link>
  );

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
        {authButton}
      </div>
    </header>
  );
};

export default Header;
