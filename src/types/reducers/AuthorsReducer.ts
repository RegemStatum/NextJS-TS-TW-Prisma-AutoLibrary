import AuthorWithBooksT from "../misc/AuthorWithBooksT";

type AuthorsStatePagination = {
  currentPageNumber: number;
  lastPageNumber: number;
};

type AuthorsStateSearch = {
  searchInputValue: string;
};

type AuthorsState = {
  authors: AuthorWithBooksT[];
  isAuthorsLoading: boolean;
  isAuthorsFiltered: boolean;
  pagination: AuthorsStatePagination;
  search: AuthorsStateSearch;
};

enum AuthorsReducerActionTypes {
  SET_AUTHORS = "SET_AUTHORS",
  SET_IS_AUTHORS_LOADING = "SET_IS_AUTHORS_LOADING",
  SET_IS_AUTHORS_FILTERED = "SET_IS_AUTHORS_FILTERED",
  SET_PAGINATION = "SET_PAGINATION",
  SET_SEARCH = "SET_SEARCH",
}

type SetAuthorsToShowAction = {
  type: AuthorsReducerActionTypes.SET_AUTHORS;
  payload: AuthorWithBooksT[];
};

type SetIsAuthorsLoadingAction = {
  type: AuthorsReducerActionTypes.SET_IS_AUTHORS_LOADING;
  payload: boolean;
};

type SetIsAuthorsFilteredAction = {
  type: AuthorsReducerActionTypes.SET_IS_AUTHORS_FILTERED;
  payload: boolean;
};

type SetPaginationAction = {
  type: AuthorsReducerActionTypes.SET_PAGINATION;
  payload: AuthorsStatePagination;
};

type SetSearchAction = {
  type: AuthorsReducerActionTypes.SET_SEARCH;
  payload: AuthorsStateSearch;
};

type AuthorsReducerActions =
  | SetAuthorsToShowAction
  | SetIsAuthorsLoadingAction
  | SetPaginationAction
  | SetSearchAction
  | SetIsAuthorsFilteredAction;

export type {
  AuthorsState,
  AuthorsReducerActions,
  AuthorsStatePagination,
  AuthorsStateSearch,
};

export { AuthorsReducerActionTypes };
