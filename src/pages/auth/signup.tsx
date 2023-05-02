import React, { FC } from "react";
import { Signup } from "@/components/auth";

const SigninPage: FC = () => {
  return (
    <div className="page-min-height flex items-center">
      <Signup />
    </div>
  );
};

export default SigninPage;
