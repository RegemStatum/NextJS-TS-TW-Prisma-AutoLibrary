import Signup from "@/components/auth/Signup";
import React, { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="page-min-height">
      <h1>Home</h1>
      <Signup />
    </div>
  );
};

export default HomePage;
