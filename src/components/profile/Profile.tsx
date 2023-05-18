import { signOut, useSession } from "next-auth/react";
import React, { FC } from "react";
import { SecondaryButton } from "../ui/buttons";
import { useCartContext } from "@/context/CartContext";
import ProfileOrders from "./ProfileOrders";
import Image from "next/image";

const Profile: FC = () => {
  const { data: session } = useSession();
  const cartContext = useCartContext();

  const handleSignOutButtonClick = async () => {
    try {
      await signOut();
      cartContext.clearCart();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="space-y-10">
      {/* profile info */}
      <div className="md:grid grid-cols-2 gap-4 lg:mt-12 lg:mb-32">
        <div className="hidden mt-12 -6 w-full min-h-[225px] relative rounded-md md:block">
          <Image
            src="/images/undraw_hello.svg"
            alt="profile"
            fill
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="/images/undraw_hello.svg"
            className="block max-h-[320px] h-fit"
          />
        </div>
        <div className="mt-14 mb-20 flex flex-col items-center justify-center md:items-center">
          <p className="text-lg lg:text-xl">
            Hello, {session?.user?.name || session?.user?.email}
          </p>
          <SecondaryButton
            className="w-full max-w-[250px] mt-2 md:mt-4"
            onClick={() => handleSignOutButtonClick()}
          >
            Sign out
          </SecondaryButton>
        </div>
      </div>
      {/* orders */}
      <ProfileOrders />
    </div>
  );
};

export default Profile;
