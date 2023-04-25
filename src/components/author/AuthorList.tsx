import AuthorWithBooksT from "@/types/AuthorWithBooksT";
import React, { FC } from "react";
import AuthorListItem from "./AuthorListItem";

interface Props {
  authors: AuthorWithBooksT[];
}

const AuthorList: FC<Props> = ({ authors }) => {
  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      {authors.map((author) => (
        <AuthorListItem key={author.id} author={author} />
      ))}
    </div>
  );
};

export default AuthorList;
