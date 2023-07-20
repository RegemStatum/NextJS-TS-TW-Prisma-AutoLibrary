import { BooksStateFilter } from "@/types/reducers/BooksReducer";
import React, { FC, useContext, useState } from "react";
import { useBooksContext } from "./BooksContext";
import { defaultFilterOptions } from "./BooksContext";

interface BooksFilterContextValue {
  filterOptions: BooksStateFilter;
  isShowClearFiltersButton: boolean;
  selectAuthor: (author: string) => void;
  clearAuthor: () => void;
  togglePublisher: (publisher: string) => void;
  setIsAvailable: (isAvailable: boolean) => void;
  setIsFeatured: (isFeatured: boolean) => void;
  clearFilters: () => void;
}

const booksFilterContextInitialValue: BooksFilterContextValue = {
  filterOptions: defaultFilterOptions,
  isShowClearFiltersButton: false,
  selectAuthor: (author: string) => {},
  clearAuthor: () => {},
  togglePublisher: (publisher: string) => {},
  setIsAvailable: (isAvailable: boolean) => {},
  setIsFeatured: (isFeatured: boolean) => {},
  clearFilters: () => {},
};

const BooksFilterContext = React.createContext(booksFilterContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const BooksFilterContextProvider: FC<Props> = ({ children }) => {
  const { filter: filterOptions, setFilter } = useBooksContext();
  const [isShowClearFiltersButton, setIsShowClearFiltersButton] =
    useState(false);

  const clearAuthor = () => {
    setFilter({ ...filterOptions, author: "" });
  };

  const selectAuthor = (author: string) => {
    setFilter({ ...filterOptions, author });
    setIsShowClearFiltersButton(true);
  };

  const togglePublisher = (publisher: string) => {
    const isPublisherAlreadyInPublishers = filterOptions.publishers.find(
      (p) => p === publisher
    );
    isPublisherAlreadyInPublishers
      ? removePublisher(publisher)
      : addPublisher(publisher);
  };

  const addPublisher = (publisher: string) => {
    setFilter({
      ...filterOptions,
      publishers: [...filterOptions.publishers, publisher],
    });
    setIsShowClearFiltersButton(true);
  };

  const removePublisher = (publisher: string) => {
    const newPublishers = filterOptions.publishers.filter(
      (p) => p !== publisher
    );
    setFilter({ ...filterOptions, publishers: newPublishers });
  };

  const setIsAvailable = (onlyAvailable: boolean) => {
    setFilter({ ...filterOptions, onlyAvailable });
    setIsShowClearFiltersButton(true);
  };

  const setIsFeatured = (onlyFeatured: boolean) => {
    setFilter({ ...filterOptions, onlyFeatured });
    setIsShowClearFiltersButton(true);
  };

  const clearFilters = () => {
    setFilter({ ...defaultFilterOptions });
    setIsShowClearFiltersButton(false);
  };

  return (
    <BooksFilterContext.Provider
      value={{
        filterOptions,
        isShowClearFiltersButton,
        selectAuthor,
        clearAuthor,
        togglePublisher,
        setIsAvailable,
        setIsFeatured,
        clearFilters,
      }}
    >
      {children}
    </BooksFilterContext.Provider>
  );
};

export default BooksFilterContextProvider;

export const useBooksFilterContext = () => useContext(BooksFilterContext);
