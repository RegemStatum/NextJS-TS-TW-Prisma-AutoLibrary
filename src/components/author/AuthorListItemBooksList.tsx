import React, { FC } from "react";
import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";
import AuthorListItemBooksListItem from "./AuthorListItemBooksListItem";

type Props = Pick<AuthorWithBooksT, "books">;

const AuthorListItemBooks: FC<Props> = ({ books }) => {
  if (books.length === 0) {
    return (
      <div>
        <p className="mt-3 pl-4 hidden text-xl lg:block ">No featured books</p>
      </div>
    );
  }

  return (
    <div className="pt-3 flex flex-col gap-2 md:gap-3 lg:pt-1 lg:gap-0">
      {books.map((book, index) => {
        return <AuthorListItemBooksListItem book={book} key={index} />;
      })}
    </div>
  );
};

export default AuthorListItemBooks;
