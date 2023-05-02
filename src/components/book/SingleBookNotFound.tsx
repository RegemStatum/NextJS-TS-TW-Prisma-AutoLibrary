import Link from "next/link";
import React, { FC } from "react";

const SingleBookNotFound: FC = () => {
  return (
    <div className="pt-4">
      <h2 className="text-xl font-medium lg:text-3xl">There is no book</h2>
      <Link
        href="/books"
        className="pt-1 text-normal text-blue-600 underline  lg:pt-2 lg:text-xl"
      >
        To all books
      </Link>
    </div>
  );
};

export default SingleBookNotFound;
