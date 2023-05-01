import { Session } from "next-auth";
import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { signOut } from "next-auth/react";
import { UserIcon } from "../ui/icons";

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
    <Link
      href="/profile"
      className={`w-[48px] h-[48px] p-1 group inline-block relative rounded-sm shrink-0 hover:bg-stone-100  hover:text-sky-500`}
    >
      <UserIcon />
    </Link>
  ) : (
    <Link href="/auth/signin">
      <PrimaryButton className="w-fit lg:px-6 lg:py-3">Sign in</PrimaryButton>
    </Link>
  );
};

export default HeaderAuthButton;
