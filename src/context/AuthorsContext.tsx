import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";
import React, { FC, useCallback, useContext, useReducer } from "react";
import { useAppContext } from "./AppContext";
import { authorsReducer as reducer } from "../reducers";
import {
  AuthorsReducerActionTypes,
  AuthorsState,
} from "@/types/reducers/AuthorsReducer";
import { AuthorsContextValue } from "@/types/context";

const authorsStateInitialValue: AuthorsState = {
  authorsToShow: [],
  isAuthorsLoading: true,
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
  startAuthorsLoading: () => {},
  endAuthorsLoading: () => {},
  setAuthors: () => {},
  setLastPageNumber: () => {},
  setAuthorsForPage: async () => {},
  setCurrentPageNumber: () => {},
  setSearchInputValue: () => {},
  findAuthors: async () => {},
  setInitialAuthors: () => {},
  setIsAuthorsFiltered: () => {},
};

const AuthorsContext = React.createContext(authorsContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const AuthorsContextProvider: FC<Props> = ({ children }) => {
  const { showInfoMessage } = useAppContext();
  const [state, dispatch] = useReducer(reducer, authorsStateInitialValue);

  // const [isAllAuthorsBtnShown, setIsAllAuthorsBtnShown] = useState(false);

  const startAuthorsLoading = useCallback(() => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_IS_AUTHORS_LOADING,
      payload: true,
    });
  }, []);

  const endAuthorsLoading = useCallback(() => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_IS_AUTHORS_LOADING,
      payload: false,
    });
  }, []);

  const setAuthors = useCallback((authors: AuthorWithBooksT[]) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_AUTHORS_TO_SHOW,
      payload: authors,
    });
  }, []);

  const setCurrentPageNumber = useCallback((pageNumber: number) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_CURRENT_PAGE_NUMBER,
      payload: pageNumber,
    });
  }, []);

  const setLastPageNumber = useCallback((pageNumber: number) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_LAST_PAGE_NUMBER,
      payload: pageNumber,
    });
  }, []);

  const setSearchInputValue = (value: string) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_SEARCH_INPUT_VALUE,
      payload: value,
    });
  };

  const setIsAuthorsFiltered = (isFiltered: boolean) => {
    dispatch({
      type: AuthorsReducerActionTypes.SET_IS_AUTHORS_FILTERED,
      payload: isFiltered,
    });
  };

  const setAuthorsForPage = async (pageNumber: number) => {
    try {
      startAuthorsLoading();
      const res = await fetch(`api/authors/paginateAuthors/${pageNumber}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      const authorsOnPage: AuthorWithBooksT[] = data.authors;
      if (!authorsOnPage) {
        throw new Error("There are no authors");
      }
      setAuthors(authorsOnPage);
      endAuthorsLoading();
    } catch (e: any) {
      console.log(e);
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later"
      );
      endAuthorsLoading();
    }
  };

  const findAuthors = async (query: string) => {
    try {
      startAuthorsLoading();
      const res = await fetch(`api/authors/findAuthors/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const authors: AuthorWithBooksT[] = data.authors;

      if (authors.length === 0) {
        setAuthors(authors);
        endAuthorsLoading();
        return;
      }

      setAuthors(authors);
      endAuthorsLoading();
    } catch (e: any) {
      console.log(e);
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later"
      );
      endAuthorsLoading();
    }
  };

  const setInitialAuthors = () => {
    setAuthorsForPage(1);
  };

  return (
    <AuthorsContext.Provider
      value={{
        ...state,
        setAuthors,
        setLastPageNumber,
        setAuthorsForPage,
        setCurrentPageNumber,
        setSearchInputValue,
        findAuthors,
        startAuthorsLoading,
        endAuthorsLoading,
        setInitialAuthors,
        setIsAuthorsFiltered,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsContextProvider;

export const useAuthorsContext = () => useContext(AuthorsContext);
