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
  const onPageClick = () => {
    handlePageClick(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={onPageClick}
      className={`py-2 px-4 text-lg border-2 rounded-md leading-tight md:text-xl ${
        isActive
          ? "border-neutral-400 font-medium pointer-events-none select-none"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationPageItem;
