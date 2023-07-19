import { useBooksFilterContext } from "@/context/BooksFilterContext";
import React, { FC } from "react";

type Props = {
  publisher: string;
  isChecked: boolean;
};

const BooksFilterPublishersItem: FC<Props> = ({ publisher, isChecked }) => {
  const { togglePublisher } = useBooksFilterContext();

  return (
    <div className="p-2 flex rounded-md cursor-pointer">
      <input
        type="checkbox"
        id={publisher}
        name={publisher}
        className="cursor-pointer"
        checked={isChecked}
        onChange={() => togglePublisher(publisher)}
      />
      <label
        htmlFor={publisher}
        className="w-full pl-2 cursor-pointer select-none"
      >
        {publisher}
      </label>
    </div>
  );
};

export default BooksFilterPublishersItem;
