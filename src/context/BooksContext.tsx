import BooksContextValue from "@/types/context/BooksContextValue";
import {
  BooksReducerActionTypes,
  BooksState,
  BooksStateFilter,
  BooksStatePagination,
  BooksStateSearch,
  BooksStateSort,
  BooksStateSortLabel,
} from "@/types/reducers/BooksReducer";
import React, { FC, useCallback, useContext, useReducer } from "react";
import reducer from "../reducers/booksReducer";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import { useAppContext } from "./AppContext";
import { BOOKS_PER_PAGE } from "@/utils/constants/misc";

export const defaultFilterOptions: BooksStateFilter = {
  author: "",
  publishers: [],
  onlyAvailable: false,
  onlyFeatured: false,
  // is not used by frontend for a moment
  language: "",
  cover: "",
  publicationYear: {
    from: "",
    to: "",
  },
};

const initialReducerState: BooksState = {
  books: [],
  isBooksLoading: false,
  sort: "YEAR_DESC",
  sortLabel: "Newest to oldest",
  filter: defaultFilterOptions,
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
  setSortLabel: (sortLabel: BooksStateSortLabel) => {},
  setFilter: (filterBy: BooksStateFilter) => {},
  setIsBooksFiltered: (isBooksFiltered: boolean) => {},
  setPagination: (pagination: BooksStatePagination) => {},
  setSearch: (search: BooksStateSearch) => {},
  setIsBooksLoading: (isLoading: boolean) => {},
  handlePageChange: async (
    pageNumber: number,
    filterParams?: BooksStateFilter
  ) => {},
  setIsBooksFilterSidebarOpen: (isOpen: boolean) => {},
  resetFilter: () => {},
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

  const setSortLabel = (sortLabel: BooksStateSortLabel) => {
    dispatch({
      type: BooksReducerActionTypes.SET_SORT_LABEL,
      payload: sortLabel,
    });
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

  const resetFilter = () => {
    setFilter({ ...defaultFilterOptions });
  };

  const getFilterURIParams = () => {
    const fetchParams: string[] = [];

    if (state.filter.author !== "") {
      fetchParams.push(`author=${state.filter.author}`);
    }
    if (state.filter.publishers.length !== 0) {
      for (let publisher of state.filter.publishers) {
        fetchParams.push(`publisher=${publisher}`);
      }
    }
    if (state.filter.onlyAvailable) {
      fetchParams.push(`available=${Number(state.filter.onlyAvailable)}`);
    }
    if (state.filter.onlyFeatured) {
      fetchParams.push(`featured=${Number(state.filter.onlyFeatured)}`);
    }

    const fetchParamsURI = fetchParams.join("&");
    return fetchParamsURI;
  };

  const handlePageChange = async (
    pageNumber: number,
    filterParams?: BooksStateFilter
  ) => {
    try {
      setIsBooksLoading(true);

      const filterURIParams = getFilterURIParams();

      const fetchQuery = filterParams
        ? `/api/books/paginate/${pageNumber}?sortBy=${state.sort}&${filterParams}`
        : `/api/books/paginate/${pageNumber}?sortBy=${state.sort}&${filterURIParams}`;

      const res = await fetch(fetchQuery, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 404) {
        setBooks([]);
        setIsBooksLoading(false);
        return;
      }

      const data = await res.json();

      const newBooks = data.books;
      const newTotalBooksAmount = data.totalBooksAmount;

      if (!newBooks) {
        throw new Error(`No books were fetched for page ${pageNumber}`);
      }
      if (!newTotalBooksAmount) {
        throw new Error(`No Total Books Amount`);
      }

      const newLastPageNumber = Math.ceil(newTotalBooksAmount / BOOKS_PER_PAGE);

      setBooks(newBooks);
      setPagination({
        ...state.pagination,
        currentPageNumber: pageNumber,
        lastPageNumber: newLastPageNumber,
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
        setSortLabel,
        setFilter,
        setIsBooksFilterSidebarOpen,
        setIsBooksFiltered,
        setPagination,
        setSearch,
        setIsBooksLoading,
        handlePageChange,
        resetFilter,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;

export const useBooksContext = () => useContext(BooksContext);
