import { useSession } from "next-auth/react";
import React, { FC } from "react";

const Profile: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      {/* profile info */}
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">Profile</h2>
        <p className="text-lg lg:text-xl">
          Hello, {session?.user?.name || session?.user?.email}
        </p>
      </div>
      {/* orders */}
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">Your orders</h2>
      </div>
    </div>
  );
};

export default Profile;
