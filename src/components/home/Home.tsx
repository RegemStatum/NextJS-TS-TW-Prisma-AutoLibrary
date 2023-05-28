import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import React, { FC } from "react";
import BookGrid from "../book/BooksGrid";
import Hero from "./Hero";
import { SectionHeader } from "../ui/headers";

type Props = {
  books: BookWithAuthorNameT[];
};

const Home: FC<Props> = ({ books }) => {
  return (
    <div className="space-y-6">
      <Hero />
      {/* featured books */}
      <div>
        <SectionHeader text="Featured books" />
        <BookGrid initialBooks={books} isRenderedFirstTime={true} />
      </div>
    </div>
  );
};

export default Home;
