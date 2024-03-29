import React, { FC } from "react";
import Input from "../ui/forms/Input";
import { IconWrapper, MagnifyingGlassIcon } from "../ui/icons";
import { useAuthorsContext } from "@/context/AuthorsContext";

const AuthorSearch: FC = ({}) => {
  const { search, findAuthor, setSearch, setIsAuthorsFiltered } =
    useAuthorsContext();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newValue = target.value;
    setSearch({ ...search, searchInputValue: newValue });
  };

  const clearInput = () => {
    setSearch({ ...search, searchInputValue: "" });
  };

  const handleSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsAuthorsFiltered(true);
    await findAuthor(search.searchInputValue);
  };

  return (
    <form className="flex gap-1">
      <div className="grow">
        <Input
          value={search.searchInputValue}
          onChange={handleSearchInputChange}
          name="authors_search"
          placeholder="Enter author name"
          errorMsg=""
          clearInput={clearInput}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        onClick={handleSearchSubmit}
        disabled={search.searchInputValue.length === 0}
      >
        <IconWrapper
          className={`h-full px-2 flex text-neutral-50  rounded-md cursor-pointer ${
            search.searchInputValue.length === 0
              ? "bg-neutral-400"
              : "bg-blue-600"
          } md:px-3 `}
        >
          <MagnifyingGlassIcon width={28} strokeWidth={1.75} />
        </IconWrapper>
      </button>
    </form>
  );
};

export default AuthorSearch;
