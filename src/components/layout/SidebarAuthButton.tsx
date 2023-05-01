import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { useAppContext } from "@/context/AppContext";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { UserIcon } from "../ui/icons";

interface Props {
  session: Session | null;
}

const SidebarAuthButton: FC<Props> = ({ session }) => {
  const appContext = useAppContext();
  const cartContext = useCartContext();

  const handleSignOutButtonClick = async () => {
    try {
      await signOut();
      cartContext.clearCart();
      appContext.closeSidebar();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLinkClick = () => {
    setTimeout(() => {
      appContext.closeSidebar();
    }, 300);
  };

  return session ? (
    <Link
      href="/profile"
      className="w-fit mx-auto flex gap-3 hover:text-sky-500"
      onClick={() => handleLinkClick()}
    >
      <div className={`w-[32px] h-[32px] inline-block rounded-sm shrink-0`}>
        <UserIcon />
      </div>
      <p className="w-[100px] text-2xl font-medium">Profile</p>
    </Link>
  ) : (
    <Link
      href="/auth/signin"
      className="w-fit mx-auto"
      onClick={() => handleLinkClick()}
    >
      <PrimaryButton className="w-fit text-lg px-[4rem] py-3">
        Sign in
      </PrimaryButton>
    </Link>
  );
};

export default SidebarAuthButton;
