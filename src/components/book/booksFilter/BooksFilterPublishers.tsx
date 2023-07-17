import React, { FC } from "react";
import BooksFilterPublishersItem from "./BooksFilterPublishersItem";

type Props = {
  publishers: string[];
  publishersInFilter: string[];
  togglePublisher: (publisher: string) => void;
};

const BooksFilterPublishers: FC<Props> = ({
  publishers,
  publishersInFilter,
  togglePublisher,
}) => {
  return (
    <div>
      <p className="pl-2 pb-1 font-bold">Publishers</p>
      <div>
        {publishers.map((publisher, index) => (
          <BooksFilterPublishersItem
            key={index + Number(new Date())}
            publisher={publisher}
            isChecked={Boolean(publishersInFilter.find((p) => p === publisher))}
            togglePublisher={togglePublisher}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksFilterPublishers;
