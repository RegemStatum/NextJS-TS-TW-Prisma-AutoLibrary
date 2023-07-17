import React, { FC } from "react";
import BooksFilterPublishersItem from "./BooksFilterPublishersItem";

type Props = {
  publishers: string[];
};

const BooksFilterPublishers: FC<Props> = ({ publishers }) => {
  return (
    <div>
      {publishers.map((publisher, index) => (
        <BooksFilterPublishersItem
          key={index + Number(new Date())}
          publisher={publisher}
        />
      ))}
    </div>
  );
};

export default BooksFilterPublishers;
