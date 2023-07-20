import React, { FC, useEffect } from "react";
import BookGrid from "./BooksGrid";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import Pagination from "../ui/pagination/Pagination";
import { useBooksContext } from "@/context/BooksContext";
import { Spinner1 } from "../ui/spinners";
import BooksControl from "./BooksControl";
import BooksFilterSidebar from "./booksFilter/BooksFilterSidebar";
import BooksFilterData from "@/types/misc/BooksFilterData";
import NoBooks from "./NoBooks";

type Props = {
  initialBooks: BookWithAuthorNameT[];
  initialLastPageNumber: number;
  isRenderedFirstTime: boolean;
  filterData: BooksFilterData;
};

const Books: FC<Props> = ({
  initialBooks,
  initialLastPageNumber,
  isRenderedFirstTime,
  filterData,
}) => {
  const {
    handlePageChange,
    sort,
    books,
    pagination: { currentPageNumber, lastPageNumber },
    isBooksLoading,
    isFilterSidebarOpen,
  } = useBooksContext();

  // go to first page after each sort update
  // Warning - isRenderedFirstTime is not working if we revisit page, which was visited earlier
  // probably this only affects developing version
  useEffect(() => {
    // if (isRenderedFirstTime) return;
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <div className="page-min-height relative">
      <div className="py-2 md:py-4">
        <BooksControl />
      </div>
      {isBooksLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner1 />
        </div>
      )}
      {isFilterSidebarOpen && <BooksFilterSidebar filterData={filterData} />}
      {!isBooksLoading && books.length !== 0 && (
        <>
          <BookGrid books={books} />
          <div className="my-2 md:my-4">
            <Pagination
              currentPageNumber={currentPageNumber}
              lastPageNumber={lastPageNumber}
              handlePageClick={handlePageChange}
            />
          </div>
        </>
      )}
      {initialBooks.length !== 0 &&
        books.length === 0 &&
        isRenderedFirstTime && (
          <>
            <BookGrid books={initialBooks} />
            <div className="my-2 md:my-4">
              <Pagination
                currentPageNumber={currentPageNumber}
                lastPageNumber={initialLastPageNumber}
                handlePageClick={handlePageChange}
              />
            </div>
          </>
        )}
      {!isBooksLoading && books?.length === 0 && <NoBooks />}
    </div>
  );
};

export default Books;
