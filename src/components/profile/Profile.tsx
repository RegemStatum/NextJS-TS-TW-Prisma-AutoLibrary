import { signOut, useSession } from "next-auth/react";
import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { useCartContext } from "@/context/CartContext";

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
    <div className="space-y-4">
      {/* profile info */}
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">Profile</h2>
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
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">Your orders</h2>
      </div>
    </div>
  );
};

export default Profile;
