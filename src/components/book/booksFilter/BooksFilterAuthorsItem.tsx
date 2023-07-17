import React, { FC } from "react";

type Props = {
  name: string;
};

const BooksFilterAuthorsItem: FC<Props> = ({ name }) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default BooksFilterAuthorsItem;
