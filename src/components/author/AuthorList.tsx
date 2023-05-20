import React, { FC } from "react";
import AuthorListItem from "./AuthorListItem";
import { useAuthorsContext } from "@/context/AuthorsContext";

const AuthorList: FC = ({}) => {
  const { authorsToShow } = useAuthorsContext();

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      {authorsToShow.map((author) => (
        <AuthorListItem key={author.id} author={author} />
      ))}
    </div>
  );
};

export default AuthorList;
