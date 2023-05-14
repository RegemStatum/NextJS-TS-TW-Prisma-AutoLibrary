import React, { FC } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@/components/ui/icons";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Head from "next/head";

const ErrorPage: FC = () => {
  return (
    <>
      <Head>
        <title>Auto Library | Error</title>
        <meta name="description" content="Auto Library error page" />
      </Head>
      <div className="h-full flex flex-col items-center justify-center shrink-0 page-min-height">
        <div className="mb-1 flex flex-col gap-3 items-center">
          <ExclamationTriangleIcon className="text-red-500 w-[144px] lg:w-[200px] " />
          <span className="text-5xl font-bold lg:text-8xl ">404</span>
        </div>
        <p className="mb-10 text-lg lg:mt-3 lg:text-3xl">No page found</p>
        <Link href="/" className="w-[200px] lg:w-[400px]">
          <PrimaryButton>Home</PrimaryButton>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
