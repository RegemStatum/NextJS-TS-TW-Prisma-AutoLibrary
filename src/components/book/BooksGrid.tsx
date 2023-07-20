import React, { FC } from "react";
import Book from "./BooksGridItem";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";

interface Props {
  books: BookWithAuthorNameT[];
}

const BooksGrid: FC<Props> = ({ books }) => {
  return (
    books && (
      <div className="grid gap-3 shrink-0 md:grid-cols-2 xl:grid-cols-3 lg:gap-4 ">
        {books.map((book) => {
          return <Book key={book.id} {...book} />;
        })}
      </div>
    )
  );
};

export default BooksGrid;
