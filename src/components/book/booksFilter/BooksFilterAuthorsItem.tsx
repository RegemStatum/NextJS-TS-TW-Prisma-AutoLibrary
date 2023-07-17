import React, { FC } from "react";

type Props = {
  name: string;
  selectAuthor: (author: string) => void;
  selectedAuthor: string;
};

const BooksFilterAuthorsItem: FC<Props> = ({
  name,
  selectAuthor,
  selectedAuthor,
}) => {
  return (
    <div
      onClick={() => selectAuthor(name)}
      className={`${
        name === selectedAuthor ? "outline outline-1 outline-blue-200 bg-blue-50" : ""
      } p-2 flex gap-1 rounded-md cursor-pointer hover:bg-blue-50`}
    >
      <p>{name}</p>
    </div>
  );
};

export default BooksFilterAuthorsItem;
