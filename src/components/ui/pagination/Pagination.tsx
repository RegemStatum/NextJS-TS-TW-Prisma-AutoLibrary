import React, { FC } from "react";
import PaginationPageItem from "./PaginationPageItem";

interface Props {
  currentPageNumber: number;
  lastPageNumber: number;
  handlePageClick: (pageNumber: number) => void;
}

const Pagination: FC<Props> = ({
  lastPageNumber,
  handlePageClick,
  currentPageNumber,
}) => {
  return (
    <div className="space-x-1 md:space-x-2">
      {Array.from({ length: lastPageNumber }).map((_, pageIndex) => {
        return (
          <PaginationPageItem
            key={`${new Date()}${pageIndex}`}
            pageNumber={pageIndex + 1}
            isActive={currentPageNumber === pageIndex + 1}
            handlePageClick={handlePageClick}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
