import React, { FC, useEffect } from "react";
import BookGrid from "./BooksGrid";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import Pagination from "../ui/pagination/Pagination";
import { useBooksContext } from "@/context/BooksContext";
import { Spinner1 } from "../ui/spinners";

type Props = {
  initialBooks: BookWithAuthorNameT[];
  initialLastPageNumber: number;
  isRenderedFirstTime: boolean;
};

const Books: FC<Props> = ({
  initialBooks,
  initialLastPageNumber,
  isRenderedFirstTime,
}) => {
  const {
    setSort,
    handlePageChange,
    sort,
    filter,
    pagination: { currentPageNumber, lastPageNumber },
    isBooksLoading,
  } = useBooksContext();

  // go to first page after each sort or filter update
  useEffect(() => {
    if (isRenderedFirstTime) return;
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filter]);

  return (
    <div>
      {isBooksLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner1 />
        </div>
      )}
      {!isBooksLoading && (
        <>
          <PrimaryButton onClick={() => setSort("YEAR_DESC")}>
            Set desc order
          </PrimaryButton>
          <SecondaryButton onClick={() => setSort("YEAR_ASC")}>
            Set asc order
          </SecondaryButton>
          <BookGrid
            initialBooks={initialBooks}
            isRenderedFirstTime={isRenderedFirstTime}
          />

          <div className="my-3 md:my-5">
            <Pagination
              currentPageNumber={currentPageNumber}
              lastPageNumber={
                isRenderedFirstTime ? initialLastPageNumber : lastPageNumber
              }
              handlePageClick={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
