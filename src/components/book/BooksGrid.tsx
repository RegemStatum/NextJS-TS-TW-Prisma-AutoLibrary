import React, { FC } from "react";
import Book from "./BooksGridItem";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import { useBooksContext } from "@/context/BooksContext";

interface Props {
  initialBooks: BookWithAuthorNameT[];
  isRenderedFirstTime: boolean;
}

const BooksGrid: FC<Props> = ({ initialBooks, isRenderedFirstTime }) => {
  const { books } = useBooksContext();

  return isRenderedFirstTime ? (
    <div className="grid gap-3 shrink-0 md:grid-cols-2 xl:grid-cols-3 lg:gap-4 ">
      {initialBooks.map((book) => {
        return <Book key={book.id} {...book} />;
      })}
    </div>
  ) : (
    <div className="grid gap-3 shrink-0 md:grid-cols-2 xl:grid-cols-3 lg:gap-4 ">
      {books.map((book) => {
        return <Book key={book.id} {...book} />;
      })}
    </div>
  );
};

export default BooksGrid;
