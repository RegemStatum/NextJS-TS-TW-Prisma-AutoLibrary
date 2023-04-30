import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { useAppContext } from "@/context/AppContext";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";

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

  return session ? (
    <div className="w-[205px] mx-auto">
      <SecondaryButton
        onClick={() => handleSignOutButtonClick()}
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
};

export default SidebarAuthButton;
