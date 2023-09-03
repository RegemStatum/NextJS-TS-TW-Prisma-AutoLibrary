import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import React, { FC } from "react";
import BookGrid from "../book/BooksGrid";
import Hero from "./Hero";
// import { SectionHeader } from "../ui/headers";
import { H2 } from "../ui/headings";

type Props = {
  books: BookWithAuthorNameT[];
};

const Home: FC<Props> = ({ books }) => {
  return (
    <div className="space-y-6">
      <Hero />
      {/* featured books */}
      <div>
        <div className="mb-2 flex mx-auto justify-center">
          <H2>Featured books</H2>
        </div>
        <BookGrid books={books} />
      </div>
    </div>
  );
};

export default Home;
