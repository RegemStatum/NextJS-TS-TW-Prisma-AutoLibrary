import React, { FC } from "react";
import { Signup } from "@/components/auth";
import Head from "next/head";

const SignupPage: FC = () => {
  return (
    <>
      <Head>
        <title>Autolib | Sign Up</title>
        <meta name="description" content="Autolib sign up" />
      </Head>
      <div className="page-min-height flex items-center">
        <Signup />
      </div>
    </>
  );
};

export default SignupPage;
