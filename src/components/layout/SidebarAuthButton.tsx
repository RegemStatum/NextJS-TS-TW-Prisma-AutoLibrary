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

  const handleLinkClick = () => {
    setTimeout(() => {
      appContext.closeSidebar();
    }, 300);
  };

  return session ? (
    <Link
      href="/profile"
      className="w-fit mx-auto flex gap-3 hover:text-blue-500"
      onClick={() => handleLinkClick()}
    >
      <div className={`w-[32px] h-[32px] inline-block rounded-md shrink-0`}>
        <UserIcon />
      </div>
      <p className="w-[100px] text-2xl font-medium">Profile</p>
    </Link>
  ) : (
    <Link
      href="/auth/signin"
      className="shrink-0 flex justify-center"
      onClick={() => handleLinkClick()}
    >
      <PrimaryButton className="max-w-[144px] text-lg">Sign in</PrimaryButton>
    </Link>
  );
};

export default SidebarAuthButton;
