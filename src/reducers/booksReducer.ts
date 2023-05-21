import {
  BooksReducerActionTypes,
  BooksReducerActions,
  BooksState,
} from "@/types/reducers/BooksReducer";

const reducer = (
  state: BooksState,
  action: BooksReducerActions
): BooksState => {
  switch (action.type) {
    case BooksReducerActionTypes.SET_BOOKS: {
      const newBooks = action.payload;
      const newState: BooksState = {
        ...state,
        books: newBooks,
      };
      return newState;
    }
    case BooksReducerActionTypes.SET_SORT: {
      const newSort = action.payload;
      const newState: BooksState = {
        ...state,
        sort: newSort,
      };
      return newState;
    }
    case BooksReducerActionTypes.SET_FILTER: {
      const newFilter = action.payload;
      const newState: BooksState = {
        ...state,
        filter: newFilter,
      };
      return newState;
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
