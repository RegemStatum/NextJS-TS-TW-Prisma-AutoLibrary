import AuthorWithBooksT from "../misc/AuthorWithBooksT";

type AuthorsState = {
  authorsToShow: AuthorWithBooksT[];
  isAuthorsLoading: boolean;
  isAuthorsFiltered: boolean;
  pagination: {
    currentPageNumber: number;
    lastPageNumber: number;
  };
  search: {
    searchInputValue: string;
  };
};

enum AuthorsReducerActionTypes {
  SET_AUTHORS_TO_SHOW = "SET_AUTHORS_TO_SHOW",
  SET_IS_AUTHORS_LOADING = "SET_IS_AUTHORS_LOADING",
  SET_IS_AUTHORS_FILTERED = "SET_IS_AUTHORS_FILTERED",
  SET_CURRENT_PAGE_NUMBER = "SET_CURRENT_PAGE_NUMBER",
  SET_LAST_PAGE_NUMBER = "SET_LAST_PAGE_NUMBER",
  SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE",
}

type SetAuthorsToShowAction = {
  type: AuthorsReducerActionTypes.SET_AUTHORS_TO_SHOW;
  payload: AuthorWithBooksT[];
};

type SetIsAuthorsLoadingAction = {
  type: AuthorsReducerActionTypes.SET_IS_AUTHORS_LOADING;
  payload: boolean;
};

type SetCurrentPageNumberAction = {
  type: AuthorsReducerActionTypes.SET_CURRENT_PAGE_NUMBER;
  payload: number;
};

type SetLastPageNumberAction = {
  type: AuthorsReducerActionTypes.SET_LAST_PAGE_NUMBER;
  payload: number;
};

type SetSearchInputValueAction = {
  type: AuthorsReducerActionTypes.SET_SEARCH_INPUT_VALUE;
  payload: string;
};

type SetIsAuthorsFilteredAction = {
  type: AuthorsReducerActionTypes.SET_IS_AUTHORS_FILTERED;
  payload: boolean;
};

type AuthorsReducerActions =
  | SetAuthorsToShowAction
  | SetIsAuthorsLoadingAction
  | SetCurrentPageNumberAction
  | SetLastPageNumberAction
  | SetSearchInputValueAction
  | SetIsAuthorsFilteredAction;

export type { AuthorsState, AuthorsReducerActions };

export { AuthorsReducerActionTypes };
