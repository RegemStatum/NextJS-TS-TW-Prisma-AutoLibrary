import React, { FC } from "react";

type Props = {
  publisher: string;
};

const BooksFilterPublishersItem: FC<Props> = ({ publisher }) => {
  return (
    <div>
      <p>{publisher}</p>
    </div>
  );
};

export default BooksFilterPublishersItem;
