import { signOut, useSession } from "next-auth/react";
import React, { FC } from "react";
import { SecondaryButton } from "../ui/buttons";
import { useCartContext } from "@/context/CartContext";
import ProfileOrders from "./ProfileOrders";

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
    <div className="pt-4 space-y-10">
      {/* profile info */}
      <div>
        <h2 className="mb-1 text-xl font-bold lg:mb-2 lg:text-2xl">Profile</h2>
        <p className="text-lg lg:text-xl">
          Hello, {session?.user?.name || session?.user?.email}
        </p>
        <SecondaryButton
          className="w-full max-w-[250px] mt-2"
          onClick={() => handleSignOutButtonClick()}
        >
          Sign out
        </SecondaryButton>
      </div>
      {/* orders */}
      <ProfileOrders />
    </div>
  );
};

export default Profile;
