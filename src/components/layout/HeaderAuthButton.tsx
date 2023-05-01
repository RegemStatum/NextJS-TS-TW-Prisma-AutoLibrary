import { Session } from "next-auth";
import React, { FC } from "react";
import { PrimaryButton } from "../ui/buttons";
import Link from "next/link";
import { UserIcon } from "../ui/icons";

type Props = {
  session: Session | null;
};

const HeaderAuthButton: FC<Props> = ({ session }) => {
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
