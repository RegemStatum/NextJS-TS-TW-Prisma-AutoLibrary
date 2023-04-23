import React, { FC } from "react";
import Link from "next/link";

const ErrorPage: FC = () => {
  return (
    <div>
      <span>404</span>
      <p>Sorry, there was the problem</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default ErrorPage;
