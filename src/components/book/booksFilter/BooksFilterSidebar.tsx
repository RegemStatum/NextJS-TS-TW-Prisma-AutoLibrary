import React, { FC, useState } from "react";
import { IconWrapper, XMarkIcon } from "../../ui/icons";
import { useBooksContext } from "@/context/BooksContext";
import CheckboxInput from "../../ui/forms/CheckboxInput";
import BooksFilterData from "@/types/misc/BooksFilterData";
import BooksFilterAuthors from "./BooksFilterAuthors";
import BooksFilterPublishers from "./BooksFilterPublishers";
import { PrimaryButton } from "@/components/ui/buttons";
import { useAppContext } from "@/context/AppContext";

type Props = {
  filterData: BooksFilterData;
};

interface FilterOptions {
  author: string;
  publishers: string[];
  isAvailable: boolean;
  isFeatured: boolean;
}

const defaultFilterOptions: FilterOptions = {
  author: "",
  publishers: [],
  isAvailable: true,
  isFeatured: false,
};

const BooksFilterSidebar: FC<Props> = ({ filterData }) => {
  const { showInfoMessage } = useAppContext();
  const { setIsBooksFilterSidebarOpen } = useBooksContext();
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(defaultFilterOptions);
  const [isLoading, setIsLoading] = useState(false);

  const closeSidebar = () => {
    setIsBooksFilterSidebarOpen(false);
  };

  const selectAuthor = (author: string) => {
    setFilterOptions({ ...filterOptions, author });
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
    setFilterOptions({
      ...filterOptions,
      publishers: [...filterOptions.publishers, publisher],
    });
  };

  const removePublisher = (publisher: string) => {
    const newPublishers = filterOptions.publishers.filter(
      (p) => p !== publisher
    );
    setFilterOptions({ ...filterOptions, publishers: newPublishers });
  };

  const setIsAvailable = (isAvailable: boolean) => {
    setFilterOptions({ ...filterOptions, isAvailable });
  };

  const setIsFeatured = (isFeatured: boolean) => {
    setFilterOptions({ ...filterOptions, isFeatured });
  };

  const applyFilters = async () => {
    try {
      setIsLoading(true);
      // send fetch
      const res = await fetch(`/api/filter?`)
      setIsBooksFilterSidebarOpen(false);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      setIsBooksFilterSidebarOpen(false);
      setIsLoading(false);
      showInfoMessage(
        "error",
        e.message || "Something went wrong, try again later"
      );
    }
  };

  return (
    <aside className="absolute top-0 left-0 z-10 w-full max-w-[400px] h-fit bg-neutral-50 border-2 border-neutral-400 rounded-md shadow-2xl md:top-1 md:left-1 lg:top-2">
      <div className="p-2 md:p-5">
        {/* header */}
        <div className="flex justify-end" onClick={closeSidebar}>
          <IconWrapper>
            <XMarkIcon width={22} />
          </IconWrapper>
        </div>
        {/* authors */}
        <div>
          <BooksFilterAuthors
            authors={filterData.authors}
            selectAuthor={selectAuthor}
            selectedAuthor={filterOptions.author}
          />
        </div>
        {/* publishers  */}
        <div className="my-2 py-3 rounded-md bg-neutral-100">
          <BooksFilterPublishers
            publishers={filterData.publishers}
            publishersInFilter={filterOptions.publishers}
            togglePublisher={togglePublisher}
          />
        </div>
        <div className="mb-2">
          <div className="p-2 rounded-md cursor-pointer">
            <CheckboxInput
              name="only_available"
              label="Only available"
              checked={filterOptions.isAvailable}
              onChange={() => setIsAvailable(!filterOptions.isAvailable)}
            />
          </div>
          <div className="p-2 rounded-md cursor-pointer">
            <CheckboxInput
              name="only_featured"
              label="Only featured"
              checked={filterOptions.isFeatured}
              onChange={() => setIsFeatured(!filterOptions.isFeatured)}
            />
          </div>
        </div>
        <PrimaryButton onClick={applyFilters}>Apply</PrimaryButton>
      </div>
    </aside>
  );
};

export default BooksFilterSidebar;
