import React, { FC, useEffect, useState } from "react";
import Input from "../ui/forms/Input";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { SecondaryButton } from "../ui/buttons";

type Book = {
  id: string;
  title: string;
  author: {
    firstName: string;
    secondName: string;
  };
};

const SearchModal: FC = () => {
  const appContext = useAppContext();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  // clear error message after 5 secs
  useEffect(() => {
    if (errorMessage === "") return;
    const timer = setTimeout(() => setErrorMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const findBooks = async (searchValue: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/books/findBooks/${searchValue}`);
      const data = await res.json();
      const newBooks = data.books;
      setBooks(newBooks || []);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    if (
      !newSearchValue ||
      newSearchValue === "" ||
      newSearchValue.trim() === ""
    )
      return;
    await findBooks(newSearchValue);
  };

  const clearInput = () => {
    setSearchValue("");
    setBooks([]);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-neutral-900 bg-opacity-60">
      <div
        className={`absolute top-[8px] left-1/2 -translate-x-1/2 w-full max-w-[750px] p-4 rounded-md shadow-lg bg-neutral-50 md:p-5`}
      >
        <div className="flex items-center">
          <div className="grow mr-2">
            <Input
              value={searchValue}
              onChange={handleInput}
              clearInput={clearInput}
              name="books_search"
              placeholder="Enter book title"
              errorMsg={errorMessage}
              autoComplete="off"
            />
          </div>
          <div className="max-w-[100px]">
            <SecondaryButton onClick={appContext.closeSearchModal}>
              Close
            </SecondaryButton>
          </div>
        </div>
        {books.length !== 0 && searchValue !== "" && (
          <div className="mt-3 flex flex-col">
            {books.map((book, id) => (
              <Link
                href={`/books/${book.id}`}
                key={id}
                onClick={appContext.closeSearchModal}
              >
                <div
                  className={`px-2 py-3 ${
                    id % 2 ? "bg-neutral-100 shadow-sm" : ""
                  }`}
                >
                  <p className={`rounded-sm font-medium line-clamp-1`}>
                    {book.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {books.length === 0 && searchValue !== "" && !isLoading && (
          <div className="mt-3">
            <p>No books were found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
