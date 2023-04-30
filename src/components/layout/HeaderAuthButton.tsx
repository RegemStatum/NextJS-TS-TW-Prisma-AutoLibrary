import { Session } from "next-auth";
import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

const HeaderAuthButton: FC<Props> = ({ session }) => {
  const cartContext = useCartContext();

  const handleSignOutButtonClick = async () => {
    try {
      await signOut();
      cartContext.clearCart();
    } catch (e) {
      console.log(e);
    }
  };

  return session?.user ? (
    <SecondaryButton
      onClick={() => handleSignOutButtonClick()}
      className="w-fit lg:px-6 lg:py-[10px]"
    >
      <p className="min-w-fit">Sign out</p>
    </SecondaryButton>
  ) : (
    <Link href="/auth/signin">
      <PrimaryButton className="w-fit lg:px-6 lg:py-3">Sign in</PrimaryButton>
    </Link>
  );
};

export default HeaderAuthButton;
