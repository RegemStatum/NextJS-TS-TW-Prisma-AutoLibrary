import React, { FC } from "react";
import { IconWrapper, XMarkIcon } from "../../ui/icons";
import { defaultFilterOptions, useBooksContext } from "@/context/BooksContext";
import CheckboxInput from "../../ui/forms/CheckboxInput";
import BooksFilterData from "@/types/misc/BooksFilterData";
import BooksFilterAuthors from "./BooksFilterAuthors";
import BooksFilterPublishers from "./BooksFilterPublishers";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { useBooksFilterContext } from "@/context/BooksFilterContext";

type Props = {
  filterData: BooksFilterData;
};

const BooksFilterSidebar: FC<Props> = ({ filterData }) => {
  const { setIsBooksFilterSidebarOpen, handlePageChange, resetFilter } =
    useBooksContext();
  const {
    filterOptions,
    isShowClearFiltersButton,
    setIsAvailable,
    setIsFeatured,
  } = useBooksFilterContext();

  const closeSidebar = () => {
    setIsBooksFilterSidebarOpen(false);
  };

  const handleApplyClick = async () => {
    await handlePageChange(1);
    closeSidebar();
  };

  const handleClearFiltersClick = async () => {
    resetFilter();
    await handlePageChange(1, { ...defaultFilterOptions });
    closeSidebar();
  };

  return (
    <aside className="absolute top-0 left-0 z-10 w-full max-w-[400px]">
      <div className="h-fit bg-neutral-50 border-2 border-neutral-400 rounded-md shadow-2xl md:top-1 md:left-1 lg:top-2">
        <div className="p-2 md:p-5">
          {/* header */}
          <div className="flex justify-end" onClick={closeSidebar}>
            <IconWrapper>
              <XMarkIcon width={22} />
            </IconWrapper>
          </div>
          {/* authors */}
          <div className="px-2">
            <BooksFilterAuthors authors={filterData.authors} />
          </div>
          {/* publishers  */}
          <div className="my-2 px-2 py-3 rounded-md bg-neutral-100">
            <BooksFilterPublishers publishers={filterData.publishers} />
          </div>
          <div className="mb-2 px-2">
            <div className="p-2 rounded-md cursor-pointer">
              <CheckboxInput
                name="only_available"
                label="Only available"
                checked={filterOptions.onlyAvailable}
                onChange={() => setIsAvailable(!filterOptions.onlyAvailable)}
              />
            </div>
            <div className="p-2 rounded-md cursor-pointer">
              <CheckboxInput
                name="only_featured"
                label="Only featured"
                checked={filterOptions.onlyFeatured}
                onChange={() => setIsFeatured(!filterOptions.onlyFeatured)}
              />
            </div>
          </div>
          <div className="px-1 space-y-1">
            <PrimaryButton onClick={handleApplyClick}>Apply</PrimaryButton>
            {isShowClearFiltersButton && (
              <SecondaryButton onClick={handleClearFiltersClick}>
                Clear filters
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BooksFilterSidebar;
