import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";
import React, { FC, useCallback, useContext, useReducer } from "react";
import { useAppContext } from "./AppContext";
import reducer from "../reducers/authorsReducer";
import {
  AuthorsReducerActionTypes,
  AuthorsState,
  AuthorsStatePagination,
  AuthorsStateSearch,
} from "@/types/reducers/AuthorsReducer";
import AuthorsContextValue from "@/types/context/AuthorsContextValue";

const authorsStateInitialValue: AuthorsState = {
  authors: [],
  isAuthorsLoading: false,
  isAuthorsFiltered: false,
  pagination: {
    currentPageNumber: 1,
    lastPageNumber: 1,
  },
  search: {
    searchInputValue: "",
  },
};

const authorsContextInitialValue: AuthorsContextValue = {
  ...authorsStateInitialValue,
  setAuthors: (authors: AuthorWithBooksT[]) => {},
  setIsAuthorsFiltered: (isFiltered: boolean) => {},
  setPagination: (pagination: AuthorsStatePagination) => {},
  setSearch: (search: AuthorsStateSearch) => {},
  setIsAuthorsLoading: (isLoading: boolean) => {},
  handlePageChange: async (pageNumber: number) => {},
  findAuthor: async (authorName: string) => {},
};

const AuthorsContext = React.createContext(authorsContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const AuthorsContextProvider: FC<Props> = ({ children }) => {
  const { showInfoMessage } = useAppContext();
  const [state, dispatch] = useReducer(reducer, authorsStateInitialValue);

  const setAuthors = useCallback((authors: AuthorWithBooksT[]) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_AUTHORS,
      payload: authors,
    });
  }, []);

  const setIsAuthorsFiltered = (isFiltered: boolean) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_IS_AUTHORS_FILTERED,
      payload: isFiltered,
    });
  };

  const setPagination = useCallback((pagination: AuthorsStatePagination) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_PAGINATION,
      payload: pagination,
    });
  }, []);

  const setSearch = (search: AuthorsStateSearch) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_SEARCH,
      payload: search,
    });
  };

  const setIsAuthorsLoading = (isLoading: boolean) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_IS_AUTHORS_LOADING,
      payload: isLoading,
    });
  };

  const handlePageChange = async (pageNumber: number) => {
    try {
      setIsAuthorsLoading(true);
      const res = await fetch(`api/authors/paginate/${pageNumber}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      const authorsOnPage: AuthorWithBooksT[] = data.authors;
      if (!authorsOnPage) {
        throw new Error("There are no authors");
      }
      setAuthors(authorsOnPage);
      setPagination({
        ...state.pagination,
        currentPageNumber: pageNumber,
      });
      setIsAuthorsLoading(false);
    } catch (e: any) {
      console.log(e);
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later"
      );
      setIsAuthorsLoading(false);
    }
  };

  const findAuthor = async (authorName: string) => {
    try {
      setIsAuthorsLoading(true);
      const res = await fetch(
        `api/authors/paginate/1?authorName=${authorName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 404) {
        showInfoMessage("error", "Author not found");
        setIsAuthorsLoading(false);
        return;
      }

      const data = await res.json();
      const authors: AuthorWithBooksT[] = data.authors;

      if (authors.length === 0) {
        setAuthors(authors);
        setIsAuthorsLoading(false);
        return;
      }

      setAuthors(authors);
      setIsAuthorsLoading(false);
    } catch (e: any) {
      console.log(e);

      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later"
      );
      setIsAuthorsLoading(false);
    }
  };

  return (
    <AuthorsContext.Provider
      value={{
        ...state,
        setAuthors,
        setIsAuthorsFiltered,
        setPagination,
        setSearch,
        setIsAuthorsLoading,
        handlePageChange,
        findAuthor,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsContextProvider;

export const useAuthorsContext = () => useContext(AuthorsContext);
