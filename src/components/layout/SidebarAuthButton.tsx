import React, { FC } from "react";
import { PrimaryButton } from "../ui/buttons";
import { useAppContext } from "@/context/AppContext";
import { Session } from "next-auth";
import Link from "next/link";
import { UserIcon } from "../ui/icons";

interface Props {
  session: Session | null;
}

const SidebarAuthButton: FC<Props> = ({ session }) => {
  const appContext = useAppContext();

  return session ? (
    <Link
      href="/profile"
      className="w-full mx-auto px-5 py-2 flex gap-5 rounded-full hover:bg-slate-200 hover:text-blue-500 overflow-hidden"
      onClick={() => {
        appContext.closeSidebar();
      }}
    >
      <div className={`w-[32px] h-[32px] -ml-[1px] inline-block rounded-md`}>
        <UserIcon className="flex" />
      </div>
      <p className="text-2xl font-medium">Profile</p>
    </Link>
  ) : (
    <Link
      href="/auth/signin"
      className="shrink-0 flex justify-center"
      onClick={() => {
        appContext.closeSidebar();
      }}
    >
      <PrimaryButton className="max-w-[144px] text-lg">Sign in</PrimaryButton>
    </Link>
  );
};

export default SidebarAuthButton;
