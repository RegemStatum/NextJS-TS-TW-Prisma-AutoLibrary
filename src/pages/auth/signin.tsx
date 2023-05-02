import React, { FC } from "react";
import { Signin } from "@/components/auth";
import Head from "next/head";

const SigninPage: FC = () => {
  return (
    <>
      <Head>
        <title>Auto Library | Sign In</title>
        <meta name="description" content="Auto Library sign in" />
      </Head>
      <div className="page-min-height flex items-center">
        <Signin />
      </div>
    </>
  );
};

export default SigninPage;
