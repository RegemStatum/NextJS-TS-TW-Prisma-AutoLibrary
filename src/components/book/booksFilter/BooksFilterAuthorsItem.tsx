import { useBooksFilterContext } from "@/context/BooksFilterContext";
import React, { FC } from "react";

type Props = {
  name: string;
};

const BooksFilterAuthorsItem: FC<Props> = ({ name }) => {
  const {
    filterOptions: { author },
    selectAuthor,
    clearAuthor,
  } = useBooksFilterContext();

  const handleClick = () => {
    name === author ? clearAuthor() : selectAuthor(name);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        name === author ? "outline outline-1 outline-blue-200 bg-blue-50" : ""
      } p-2 flex gap-1 rounded-md cursor-pointer hover:bg-blue-50`}
    >
      <p>{name}</p>
    </div>
  );
};

export default BooksFilterAuthorsItem;
