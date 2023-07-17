import BooksContextValue from "@/types/context/BooksContextValue";
import {
  BooksReducerActionTypes,
  BooksState,
  BooksStateFilter,
  BooksStatePagination,
  BooksStateSearch,
  BooksStateSort,
} from "@/types/reducers/BooksReducer";
import React, { FC, useCallback, useContext, useReducer } from "react";
import reducer from "../reducers/booksReducer";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import { useAppContext } from "./AppContext";

const initialReducerState: BooksState = {
  books: [],
  isBooksLoading: false,
  sort: "YEAR_DESC",
  filter: {
    onlyAvailable: false,
    onlyFeatured: false,
    author: "",
    publisher: "",
    language: "",
    cover: "",
    publicationYear: {
      from: "",
      to: "",
    },
  },
  isFilterSidebarOpen: false,
  isBooksFiltered: false,
  pagination: {
    currentPageNumber: 1,
    lastPageNumber: 1,
  },
  search: {
    searchInputValue: "",
  },
};

const booksContextInitialValue: BooksContextValue = {
  ...initialReducerState,
  setBooks: (books: BookWithAuthorNameT[]) => {},
  setSort: (sortBy: BooksStateSort) => {},
  setFilter: (filterBy: BooksStateFilter) => {},
  setIsBooksFiltered: (isBooksFiltered: boolean) => {},
  setPagination: (pagination: BooksStatePagination) => {},
  setSearch: (search: BooksStateSearch) => {},
  setIsBooksLoading: (isLoading: boolean) => {},
  handlePageChange: async (pageNumber: number) => {},
  setIsBooksFilterSidebarOpen: (isOpen: boolean) => {},
};

const BooksContext = React.createContext(booksContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const BooksContextProvider: FC<Props> = ({ children }) => {
  const { showInfoMessage } = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const setBooks = useCallback((books: BookWithAuthorNameT[]) => {
    dispatch({ type: BooksReducerActionTypes.SET_BOOKS, payload: books });
  }, []);

  const setSort = (sortBy: BooksStateSort) => {
    dispatch({ type: BooksReducerActionTypes.SET_SORT, payload: sortBy });
  };

  const setFilter = (filterBy: BooksStateFilter) => {
    dispatch({ type: BooksReducerActionTypes.SET_FILTER, payload: filterBy });
  };

  const setIsBooksFiltered = (isBooksFiltered: boolean) => {
    dispatch({
      type: BooksReducerActionTypes.SET_IS_BOOKS_FILTERED,
      payload: isBooksFiltered,
    });
  };

  const setPagination = useCallback((pagination: BooksStatePagination) => {
    dispatch({
      type: BooksReducerActionTypes.SET_PAGINATION,
      payload: pagination,
    });
  }, []);

  const setSearch = (search: BooksStateSearch) => {
    dispatch({ type: BooksReducerActionTypes.SET_SEARCH, payload: search });
  };

  const setIsBooksLoading = (isLoading: boolean) => {
    dispatch({
      type: BooksReducerActionTypes.SET_IS_BOOKS_LOADING,
      payload: isLoading,
    });
  };

  const setIsBooksFilterSidebarOpen = (isOpen: boolean) => {
    dispatch({
      type: BooksReducerActionTypes.SET_IS_FILTER_SIDEBAR_OPEN,
      payload: isOpen,
    });
  };

  const handlePageChange = async (pageNumber: number) => {
    try {
      setIsBooksLoading(true);
      const res = await fetch(
        `/api/books/paginate/${pageNumber}?sortBy=${state.sort}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      const newBooks = data.books;
      if (!newBooks) {
        throw new Error(`No books were fetched for page ${pageNumber}`);
      }
      setBooks(newBooks);
      setPagination({
        ...state.pagination,
        currentPageNumber: pageNumber,
      });
      setIsBooksLoading(false);
    } catch (e: any) {
      console.log(e);
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later"
      );
      setIsBooksLoading(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        ...state,
        setBooks,
        setSort,
        setFilter,
        setIsBooksFilterSidebarOpen,
        setIsBooksFiltered,
        setPagination,
        setSearch,
        setIsBooksLoading,
        handlePageChange,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;

export const useBooksContext = () => useContext(BooksContext);
