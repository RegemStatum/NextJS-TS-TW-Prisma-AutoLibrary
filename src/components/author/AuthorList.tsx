import React, { FC } from "react";
import AuthorListItem from "./AuthorListItem";
import { useAuthorsContext } from "@/context/AuthorsContext";
import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";

type Props = {
  isRenderedFirstTime: boolean;
  initialAuthors: AuthorWithBooksT[];
};

const AuthorList: FC<Props> = ({ isRenderedFirstTime, initialAuthors }) => {
  const { authors } = useAuthorsContext();

  return isRenderedFirstTime ? (
    <div className="flex flex-col gap-3 lg:gap-6">
      {initialAuthors.map((author) => (
        <AuthorListItem key={author.id} author={author} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-3 lg:gap-6">
      {authors.map((author) => (
        <AuthorListItem key={author.id} author={author} />
      ))}
    </div>
  );
};

export default AuthorList;
