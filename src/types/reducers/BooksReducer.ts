import BookWithAuthorNameT from "../misc/BookWithAuthorNameT";

type BooksState = {
  books: BookWithAuthorNameT[];
};

enum BooksReducerActionTypes {
  SET_BOOKS = "SET_BOOKS",
}

type SetBooksAction = {
  type: BooksReducerActionTypes.SET_BOOKS;
  payload: BookWithAuthorNameT[];
};

type BooksReducerActions = SetBooksAction;

export type { BooksState, BooksReducerActions };

export { BooksReducerActionTypes };
