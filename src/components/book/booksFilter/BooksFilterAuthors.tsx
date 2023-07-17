import React, { FC } from "react";
import BooksFilterAuthorsItem from "./BooksFilterAuthorsItem";

type Props = {
  authors: string[];
  selectedAuthor: string;
  selectAuthor: (author: string) => void;
};

const BooksFilterAuthors: FC<Props> = ({
  authors,
  selectedAuthor,
  selectAuthor,
}) => {
  return (
    <div>
      <p className="pl-2 pb-1 font-bold">Authors</p>
      <div>
        {authors.map((author, index) => (
          <BooksFilterAuthorsItem
            key={index + Number(new Date())}
            name={author}
            selectedAuthor={selectedAuthor}
            selectAuthor={selectAuthor}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksFilterAuthors;
