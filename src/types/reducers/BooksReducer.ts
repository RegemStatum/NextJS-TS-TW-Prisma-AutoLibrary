import BookWithAuthorNameT from "../misc/BookWithAuthorNameT";

type BooksStateSort = "YEAR_ASC" | "YEAR_DESC";

type BooksStateFilter = {
  onlyAvailable: boolean;
  onlyFeatured: boolean;
  author: string;
  publisher: string;
  language: string;
  cover: "hardcover" | "softcover" | "";
  publicationYear: {
    from: string;
    to: string;
  };
};

type BooksState = {
  books: BookWithAuthorNameT[];
  sort: BooksStateSort;
  filter: BooksStateFilter;
};

enum BooksReducerActionTypes {
  SET_BOOKS = "SET_BOOKS",
  SET_SORT = "SET_SORT",
  SET_FILTER = "SET_FILTER",
}

type SetBooksAction = {
  type: BooksReducerActionTypes.SET_BOOKS;
  payload: BookWithAuthorNameT[];
};

type SetSortAction = {
  type: BooksReducerActionTypes.SET_SORT;
  payload: BooksStateSort;
};

type SetFilterAction = {
  type: BooksReducerActionTypes.SET_FILTER;
  payload: BooksStateFilter;
};

type BooksReducerActions = SetBooksAction | SetSortAction | SetFilterAction;

export type {
  BooksState,
  BooksReducerActions,
  BooksStateFilter,
  BooksStateSort,
};

export { BooksReducerActionTypes };
