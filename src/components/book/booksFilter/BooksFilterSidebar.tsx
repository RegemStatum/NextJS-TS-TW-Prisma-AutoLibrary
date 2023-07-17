import React, { FC } from "react";
import { IconWrapper, XMarkIcon } from "../../ui/icons";
import { useBooksContext } from "@/context/BooksContext";
import CheckboxInput from "../../ui/forms/CheckboxInput";
import BooksFilterData from "@/types/misc/BooksFilterData";
import BooksFilterAuthors from "./BooksFilterAuthors";
import BooksFilterPublishers from "./BooksFilterPublishers";

type Props = {
  filterData: BooksFilterData;
};

const BooksFilterSidebar: FC<Props> = ({ filterData }) => {
  const { setIsBooksFilterSidebarOpen } = useBooksContext();

  const closeSidebar = () => {
    setIsBooksFilterSidebarOpen(false);
  };

  return (
    <aside className="absolute top-0 left-0 z-10 w-full h-fit bg-neutral-50 border rounded-md">
      <div className="p-2">
        {/* header */}
        <div className="flex justify-end" onClick={closeSidebar}>
          <IconWrapper>
            <XMarkIcon width={22} />
          </IconWrapper>
        </div>
        {/* authors */}
        <div>
          <BooksFilterAuthors authors={filterData.authors} />
        </div>
        {/* publishers  */}
        <div className="bg-neutral-200">
          <BooksFilterPublishers publishers={filterData.publishers} />
        </div>
        <div>
          <CheckboxInput name="only_available" label="Only available" />
        </div>
        <div>
          <CheckboxInput name="only_featured" label="Only featured" />
        </div>
        <div></div>
      </div>
    </aside>
  );
};

export default BooksFilterSidebar;
