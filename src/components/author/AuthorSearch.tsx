import React, { FC } from "react";
import Input from "../ui/forms/Input";
import { IconWrapper, MagnifyingGlassIcon } from "../ui/icons";
import { useAuthorsContext } from "@/context/AuthorsContext";

const AuthorSearch: FC = ({}) => {
  const {
    search: { searchInputValue },
    findAuthors,
    setSearchInputValue,
    setIsAuthorsFiltered,
  } = useAuthorsContext();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newValue = target.value;
    setSearchInputValue(newValue);
  };

  const handleSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsAuthorsFiltered(true);
    await findAuthors(searchInputValue);
  };

  return (
    <form className="flex gap-1">
      <div className="grow">
        <Input
          value={searchInputValue}
          onChange={handleSearchInputChange}
          name="authors_search"
          errorMsg=""
          className="w-full"
        />
      </div>
      <button
        type="submit"
        onClick={handleSearchSubmit}
        disabled={searchInputValue.length === 0}
      >
        <IconWrapper
          className={`h-full px-2 flex text-neutral-50  rounded-md cursor-pointer ${
            searchInputValue.length === 0 ? "bg-neutral-400" : "bg-blue-600"
          } md:px-3 `}
        >
          <MagnifyingGlassIcon width={28} strokeWidth={1.75} />
        </IconWrapper>
      </button>
    </form>
  );
};

export default AuthorSearch;
