import React, { FC } from "react";
import BooksFilterPublishersItem from "./BooksFilterPublishersItem";
import { useBooksFilterContext } from "@/context/BooksFilterContext";

type Props = {
  publishers: string[];
};

const BooksFilterPublishers: FC<Props> = ({ publishers }) => {
  const {
    filterOptions: { publishers: publishersInFilter },
  } = useBooksFilterContext();

  return (
    <div>
      <p className="pl-2 pb-1 font-bold">Publishers</p>
      <div>
        {publishers.map((publisher, index) => (
          <BooksFilterPublishersItem
            key={index + Number(new Date())}
            publisher={publisher}
            isChecked={Boolean(publishersInFilter.find((p) => p === publisher))}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksFilterPublishers;
