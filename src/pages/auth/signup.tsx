import React, { FC } from "react";
import { Signup } from "@/components/auth";
import Head from "next/head";

const SignupPage: FC = () => {
  return (
    <>
      <Head>
        <title>Auto Library | Sign Up</title>
        <meta name="description" content="Auto Library sign up" />
      </Head>
      <div className="page-min-height flex items-center">
        <Signup />
      </div>
    </>
  );
};

export default SignupPage;
