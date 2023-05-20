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
    default: {
      return { ...state };
    }
  }
};

export default reducer;
