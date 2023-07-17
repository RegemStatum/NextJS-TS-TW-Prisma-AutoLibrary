import React, { FC } from "react";
import AuthorList from "./AuthorList";
import Pagination from "../ui/pagination/Pagination";
import AuthorSearch from "./AuthorSearch";
import { Spinner1 } from "../ui/spinners";
import Image from "next/image";
import { SecondaryButton } from "../ui/buttons";
import { useAuthorsContext } from "@/context/AuthorsContext";
import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";

type Props = {
  initialAuthors: AuthorWithBooksT[];
  isRenderedFirstTime: boolean;
  initialLastPageNumber: number;
};

const Authors: FC<Props> = ({
  initialAuthors,
  isRenderedFirstTime,
  initialLastPageNumber,
}) => {
  const {
    authors,
    isAuthorsLoading,
    isAuthorsFiltered,
    pagination,
    search,
    setIsAuthorsFiltered,
    setPagination,
    setSearch,
    handlePageChange,
  } = useAuthorsContext();

  const handlePaginationClick = async (pageNumber: number) => {
    await handlePageChange(pageNumber);
    window.scroll(0, 0);
  };

  const refreshAuthors = () => {
    setSearch({ ...search, searchInputValue: "" });
    setIsAuthorsFiltered(false);
    handlePageChange(1);
  };

  return (
    <div className="pt-7 md:pt-9 lg:pt-10">
      <div className="pb-4 lg:w-1/3 lg:max-w-[300px] lg:pb-5 lg:ml-auto">
        <AuthorSearch />
        {!isAuthorsLoading && isAuthorsFiltered && (
          <div className="my-1">
            <SecondaryButton onClick={refreshAuthors}>
              Show all authors
            </SecondaryButton>
          </div>
        )}
      </div>
      {!isAuthorsLoading && authors.length === 0 && !isRenderedFirstTime && (
        <div>
          <div className="w-full h-[300px] mt-10 relative rounded-md md:mt-20">
            <Image
              src="/images/undraw_waiting_for_you.svg"
              alt="no_authors"
              fill
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL="/images/undraw_waiting_for_you.svg"
              className="block max-h-[320px] h-fit"
            />
          </div>
          <p className="mt-8 text-2xl font-medium text-center md:text-3xl">
            No authors found
          </p>
        </div>
      )}
      {isAuthorsLoading && authors.length !== 0 && !isRenderedFirstTime && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner1 />
        </div>
      )}
      {!isAuthorsLoading && (authors.length !== 0 || isRenderedFirstTime) && (
        <div>
          <AuthorList
            initialAuthors={initialAuthors}
            isRenderedFirstTime={isRenderedFirstTime}
          />
          {!isAuthorsFiltered && (
            <div className="my-3 md:my-4">
              <Pagination
                currentPageNumber={pagination.currentPageNumber}
                lastPageNumber={
                  isRenderedFirstTime
                    ? initialLastPageNumber
                    : pagination.lastPageNumber
                }
                handlePageClick={handlePaginationClick}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Authors;
