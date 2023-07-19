import BookWithAuthorNameT from "../misc/BookWithAuthorNameT";

type BooksStateSort = "YEAR_DESC" | "YEAR_ASC";
type BooksStateSortLabel = "Newest to oldest" | "Oldest to newest";

type BooksStateFilter = {
  onlyAvailable: boolean;
  onlyFeatured: boolean;
  author: string;
  publishers: string[];
  language: string;
  cover: "hardcover" | "softcover" | "";
  publicationYear: {
    from: string;
    to: string;
  };
};

type BooksStatePagination = {
  currentPageNumber: number;
  lastPageNumber: number;
};

type BooksStateSearch = {
  searchInputValue: string;
};

type BooksState = {
  books: BookWithAuthorNameT[];
  sort: BooksStateSort;
  sortLabel: BooksStateSortLabel;
  filter: BooksStateFilter;
  isFilterSidebarOpen: boolean;
  isBooksLoading: boolean;
  isBooksFiltered: boolean;
  pagination: BooksStatePagination;
  search: BooksStateSearch;
};

enum BooksReducerActionTypes {
  SET_BOOKS = "SET_BOOKS",
  SET_IS_BOOKS_LOADING = "SET_IS_BOOKS_LOADING",
  SET_SORT = "SET_SORT",
  SET_SORT_LABEL = "SET_SORT_LABEL",
  SET_FILTER = "SET_FILTER",
  SET_IS_FILTER_SIDEBAR_OPEN = "SET_IS_FILTER_SIDEBAR_OPEN",
  SET_IS_BOOKS_FILTERED = "SET_IS_BOOKS_FILTERED",
  SET_PAGINATION = "SET_PAGINATION",
  SET_SEARCH = "SET_SEARCH",
}

type SetBooksAction = {
  type: BooksReducerActionTypes.SET_BOOKS;
  payload: BookWithAuthorNameT[];
};

type SetIsBooksLoading = {
  type: BooksReducerActionTypes.SET_IS_BOOKS_LOADING;
  payload: boolean;
};

type SetSortAction = {
  type: BooksReducerActionTypes.SET_SORT;
  payload: BooksStateSort;
};

type SetSortLabel = {
  type: BooksReducerActionTypes.SET_SORT_LABEL;
  payload: BooksStateSortLabel;
};

type SetFilterAction = {
  type: BooksReducerActionTypes.SET_FILTER;
  payload: BooksStateFilter;
};

type SetIsBooksFilteredAction = {
  type: BooksReducerActionTypes.SET_IS_BOOKS_FILTERED;
  payload: boolean;
};

type SetPaginationAction = {
  type: BooksReducerActionTypes.SET_PAGINATION;
  payload: BooksStatePagination;
};

type SetSearchAction = {
  type: BooksReducerActionTypes.SET_SEARCH;
  payload: BooksStateSearch;
};

type SetIsFilterSidebarOpenAction = {
  type: BooksReducerActionTypes.SET_IS_FILTER_SIDEBAR_OPEN;
  payload: boolean;
};

type BooksReducerActions =
  | SetBooksAction
  | SetIsBooksLoading
  | SetSortAction
  | SetSortLabel
  | SetFilterAction
  | SetIsBooksFilteredAction
  | SetPaginationAction
  | SetSearchAction
  | SetIsFilterSidebarOpenAction;

export type {
  BooksState,
  BooksReducerActions,
  BooksStateFilter,
  BooksStateSort,
  BooksStateSortLabel,
  BooksStatePagination,
  BooksStateSearch,
};

export { BooksReducerActionTypes };
