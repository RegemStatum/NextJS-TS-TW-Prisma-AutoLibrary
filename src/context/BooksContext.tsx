import BooksContextValue from "@/types/context/BooksContextValue";
import { BooksState } from "@/types/reducers/BooksReducer";
import React, { FC, useContext, useReducer } from "react";
import reducer from "../reducers/booksReducer";

const initialReducerState: BooksState = {
  books: [],
};

const booksContextInitialValue: BooksContextValue = {
  ...initialReducerState,
};

const BooksContext = React.createContext(booksContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const BooksContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  return (
    <BooksContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;

export const useBooksContext = () => useContext(BooksContext);
