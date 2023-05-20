import React, { FC } from "react";

interface Props {
  pageNumber: number;
  isActive: boolean;
  handlePageClick: (pageNumber: number) => void;
}

const PaginationPageItem: FC<Props> = ({
  pageNumber,
  isActive,
  handlePageClick,
}) => {
  return (
    <button
      onClick={() => handlePageClick(pageNumber)}
      className={`py-2 px-4 text-lg border-2 rounded-md leading-tight md:text-xl ${
        isActive
          ? "border-neutral-400 font-medium"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationPageItem;
