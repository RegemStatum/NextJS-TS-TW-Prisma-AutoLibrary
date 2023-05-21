import BooksContextValue from "@/types/context/BooksContextValue";
import {
  BooksReducerActionTypes,
  BooksState,
  BooksStateFilter,
  BooksStateSort,
} from "@/types/reducers/BooksReducer";
import React, { FC, useContext, useReducer } from "react";
import reducer from "../reducers/booksReducer";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";

const initialReducerState: BooksState = {
  books: [],
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
};

const booksContextInitialValue: BooksContextValue = {
  ...initialReducerState,
  setBooks: (books: BookWithAuthorNameT[]) => {},
  setSort: (sortBy: BooksStateSort) => {},
  setFilter: (filterBy: BooksStateFilter) => {},
};

const BooksContext = React.createContext(booksContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const BooksContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const setBooks = (books: BookWithAuthorNameT[]) => {
    dispatch({ type: BooksReducerActionTypes.SET_BOOKS, payload: books });
  };

  const setSort = (sortBy: BooksStateSort) => {
    dispatch({ type: BooksReducerActionTypes.SET_SORT, payload: sortBy });
  };

  const setFilter = (filterBy: BooksStateFilter) => {
    dispatch({ type: BooksReducerActionTypes.SET_FILTER, payload: filterBy });
  };

  return (
    <BooksContext.Provider
      value={{
        ...state,
        setBooks,
        setSort,
        setFilter,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;

export const useBooksContext = () => useContext(BooksContext);
