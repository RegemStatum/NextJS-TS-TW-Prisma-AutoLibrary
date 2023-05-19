import { Session } from "next-auth";
import React, { FC } from "react";
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
      <button className="block h-[40px] w-full py-1 px-4 bg-blue-600 text-slate-50 font-medium rounded-md select-none hover:bg-blue-700 disabled:bg-neutral-200 disabled:text-neutral-400">
        Sign in
      </button>
    </Link>
  );
};

export default HeaderAuthButton;
