import { useSession } from "next-auth/react";
import React, { FC } from "react";

const HomePage: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="page-min-height">
      <h1>Home</h1>
      <h2 className="text-3xl">
        Hello {session?.user?.name || session?.user?.email}
      </h2>
    </div>
  );
};

export default HomePage;
