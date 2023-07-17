import React, { FC } from "react";
import BooksFilterAuthorsItem from "./BooksFilterAuthorsItem";

type Props = {
  authors: string[];
};

const BooksFilterAuthors: FC<Props> = ({ authors }) => {
  return (
    <div>
      {authors.map((author, index) => (
        <BooksFilterAuthorsItem
          key={index + Number(new Date())}
          name={author}
        />
      ))}
    </div>
  );
};

export default BooksFilterAuthors;
