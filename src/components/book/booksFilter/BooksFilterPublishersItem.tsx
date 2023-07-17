import React, { FC } from "react";

type Props = {
  publisher: string;
  isChecked: boolean;
  togglePublisher: (publisher: string) => void;
};

const BooksFilterPublishersItem: FC<Props> = ({
  publisher,
  isChecked,
  togglePublisher,
}) => {
  return (
    <div className="p-2 flex gap-2 rounded-md cursor-pointer">
      <input
        type="checkbox"
        id={publisher}
        name={publisher}
        className="cursor-pointer"
        checked={isChecked}
        onChange={() => togglePublisher(publisher)}
      />
      <label htmlFor={publisher} className="cursor-pointer select-none">
        {publisher}
      </label>
    </div>
  );
};

export default BooksFilterPublishersItem;
