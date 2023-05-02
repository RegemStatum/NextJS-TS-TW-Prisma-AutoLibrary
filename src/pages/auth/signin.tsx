import React, { FC } from "react";
import { Signin } from "@/components/auth";

const SigninPage: FC = () => {
  return (
    <div className="page-min-height flex items-center">
      <Signin />
    </div>
  );
};

export default SigninPage;
