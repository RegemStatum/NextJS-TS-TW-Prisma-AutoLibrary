// import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";

const NoBooks: FC = () => {
  return (
    <div className="w-full absolute top-[20rem] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="w-full h-[300px] relative rounded-md md:block">
        <Image
          src="/images/undraw_void.svg"
          alt="profile"
          fill
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL="/images/undraw_void.svg"
          className="block max-h-[320px] h-fit"
        />
      </div>
      <h2 className="mt-8 text-2xl font-medium md:text-3xl">
        No books were found
      </h2>
      <p className="pt-2">Consider removing filters if you have any</p>
      {/* <Link
        href="/books"
        className="block w-fit mx-auto mt-1 text-lg text-blue-600 underline md:mt-3 md:text-xl"
      >
        Go to all books
      </Link> */}
    </div>
  );
};

export default NoBooks;
