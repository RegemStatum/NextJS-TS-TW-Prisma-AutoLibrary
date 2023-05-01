import { signOut, useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { SecondaryButton } from "../ui/buttons";
import { useCartContext } from "@/context/CartContext";
import { useRouter } from "next/router";
import { Spinner1 } from "../ui/spinners";

const Profile: FC = () => {
  const { data: session } = useSession();
  const cartContext = useCartContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (router.isReady && !session) {
      router.push("/");
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [session, router, router.isReady]);

  const handleSignOutButtonClick = async () => {
    try {
      await signOut();
      cartContext.clearCart();
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner1 />
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <p className="text-lg font-bold">Sorry, there is no session</p>
      </div>
    );
  }

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
