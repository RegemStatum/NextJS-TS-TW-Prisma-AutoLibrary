import React, { FC } from "react";
import BooksFilterAuthorsItem from "./BooksFilterAuthorsItem";

type Props = {
  authors: string[];
};

const BooksFilterAuthors: FC<Props> = ({ authors }) => {
  return (
    <div>
      <p className="pl-2 pb-1 font-bold">Authors</p>
      <div>
        {authors.map((author, index) => (
          <BooksFilterAuthorsItem
            key={index + Number(new Date())}
            name={author}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksFilterAuthors;
