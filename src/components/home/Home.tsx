import BookWithAuthorNameT from "@/types/BookWithAuthorNameT";
import Link from "next/link";
import React, { FC } from "react";
import BookGrid from "../book/BookGrid";

type Props = {
  books: BookWithAuthorNameT[];
};

const Home: FC<Props> = ({ books }) => {
  return (
    <div className="space-y-6 pt-3">
      {/* hero */}
      <div className="space-y-2 lg:text-center">
        <div className="lg:py-4">
          <h1 className="text-3xl font-black leading-tight lg:text-9xl lg:pb-4">
            Auto Library
          </h1>
          <h2 className="text-2xl font-bold leading-tight lg:text-5xl">
            Automatic issue & acceptance of books
          </h2>
        </div>
        <div>
          <p className="font-medium leading-relaxed lg:pt-3 lg:pb-1 lg:text-xl lg:font-bold">
            Bored of common libraries?
          </p>
          <p className="leading-relaxed lg:text-xl lg:w-1/2 lg:mx-auto">
            Visit our auto library — library with automatic issue & acceptance
            of books. Here you will be able to get any book in our library
            automatically without any boring conversations
          </p>
        </div>
      </div>
      {/* featured books */}
      <div>
        <h2 className="pb-2 text-xl font-medium lg:pt-12 lg:mb-4 lg:text-3xl lg:font-bold lg:text-center">
          Our
          <span className="px-1 underline italic text-blue-600">
            featured
          </span>{" "}
          books
        </h2>
        <BookGrid books={books} />
      </div>
      {/* to books */}
      <div>
        <h2 className="pb-1 text-xl font-medium lg:text-2xl">
          Have you picked up a book yet?
        </h2>
        <p className="xl:text-lg">
          Check out our books and feel free to pick any you like!
        </p>
        <Link href="/books" className="underline text-blue-600 lg:text-lg">
          To books{" "}
        </Link>
      </div>
    </div>
  );
};

export default Home;
