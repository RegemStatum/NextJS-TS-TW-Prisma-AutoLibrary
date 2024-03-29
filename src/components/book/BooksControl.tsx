import React, { FC, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
  IconWrapper,
} from "../ui/icons";
import { useBooksContext } from "@/context/BooksContext";

const BooksControl: FC = () => {
  const {
    sortLabel,
    isFilterSidebarOpen,
    setSort,
    setSortLabel,
    setIsBooksFilterSidebarOpen,
  } = useBooksContext();
  const [isShowMoreSortingOptions, setIsShowMoreSortingOptions] =
    useState(false);

  const toggleIsShowMoreSortingOptions = () => {
    const newIsShowMoreSortingOptions = !isShowMoreSortingOptions;
    setIsShowMoreSortingOptions(newIsShowMoreSortingOptions);
  };

  const setSortNewestToOldest = () => {
    setSortLabel("Newest to oldest");
    setSort("YEAR_DESC");
    setIsShowMoreSortingOptions(false);
  };

  const setSortOldestToNewest = () => {
    setSortLabel("Oldest to newest");
    setSort("YEAR_ASC");
    setIsShowMoreSortingOptions(false);
  };

  const handleFilterButtonClick = () => {
    setIsShowMoreSortingOptions(false);
    isFilterSidebarOpen
      ? setIsBooksFilterSidebarOpen(false)
      : setIsBooksFilterSidebarOpen(true);
  };

  return (
    <div className="flex gap-1 justify-end items-center text-neutral-800">
      {/* filter btn */}
      <IconWrapper onClick={handleFilterButtonClick}>
        <FunnelIcon width={32} />
      </IconWrapper>
      {/* sort btn */}
      <div
        className="relative flex p-2 gap-1 bg-neutral-100 border rounded-md cursor-pointer"
        onClick={toggleIsShowMoreSortingOptions}
      >
        <p className="leading-relaxed select-none">{sortLabel}</p>
        {isShowMoreSortingOptions ? (
          <ChevronDownIcon width={18} />
        ) : (
          <ChevronUpIcon width={18} />
        )}
        {isShowMoreSortingOptions && (
          <div className="absolute w-full top-[50px] z-10 left-0 flex flex-col bg-neutral-100 rounded-md border border-neutral-300 overflow-hidden shadow-md ">
            <p
              className={`px-2 py-2 leading-relaxed select-none ${
                sortLabel === "Newest to oldest"
                  ? "bg-neutral-200 font-medium pointer-events-none"
                  : ""
              }`}
              onClick={setSortNewestToOldest}
            >
              Newest to oldest
            </p>
            <p
              className={`px-2 py-2 leading-relaxed select-none  ${
                sortLabel === "Oldest to newest"
                  ? "bg-neutral-200 font-medium pointer-events-none"
                  : ""
              }`}
              onClick={setSortOldestToNewest}
            >
              Oldest to newest
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksControl;
