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
      className={`w-[40px] h-[40px] p-1 group inline-block relative rounded-md shrink-0 hover:bg-neutral-100  hover:text-blue-500`}
    >
      <UserIcon strokeWidth={1.3} />
    </Link>
  ) : (
    <Link href="/auth/signin" className="block h-[40px]">
      <PrimaryButton className="h-[40px] md:py-1">Sign in</PrimaryButton>
    </Link>
  );
};

export default HeaderAuthButton;
