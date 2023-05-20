import {
  AuthorsReducerActionTypes,
  AuthorsReducerActions,
  AuthorsState,
} from "@/types/reducers/AuthorsReducer";

const reducer = (
  state: AuthorsState,
  action: AuthorsReducerActions
): AuthorsState => {
  switch (action.type) {
    case AuthorsReducerActionTypes.SET_AUTHORS_TO_SHOW: {
      const newAuthorsToShow = action.payload;
      const newState: AuthorsState = {
        ...state,
        authorsToShow: newAuthorsToShow,
      };
      return newState;
    }
    case AuthorsReducerActionTypes.SET_IS_AUTHORS_LOADING: {
      const newIsAuthorsLoading = action.payload;
      const newState: AuthorsState = {
        ...state,
        isAuthorsLoading: newIsAuthorsLoading,
      };
      return newState;
    }
    case AuthorsReducerActionTypes.SET_IS_AUTHORS_FILTERED: {
      const newIsAuthorsFiltered = action.payload;
      const newState: AuthorsState = {
        ...state,
        isAuthorsFiltered: newIsAuthorsFiltered,
      };
      return newState;
    }
    case AuthorsReducerActionTypes.SET_CURRENT_PAGE_NUMBER: {
      const newCurrentPageNumber = action.payload;
      const newState: AuthorsState = {
        ...state,
        pagination: {
          ...state.pagination,
          currentPageNumber: newCurrentPageNumber,
        },
      };
      return newState;
    }
    case AuthorsReducerActionTypes.SET_LAST_PAGE_NUMBER: {
      const newLastPageNumber = action.payload;
      const newState: AuthorsState = {
        ...state,
        pagination: {
          ...state.pagination,
          lastPageNumber: newLastPageNumber,
        },
      };
      return newState;
    }
    case AuthorsReducerActionTypes.SET_SEARCH_INPUT_VALUE: {
      const newSearchInputValue = action.payload;
      const newState: AuthorsState = {
        ...state,
        search: {
          ...state.search,
          searchInputValue: newSearchInputValue,
        },
      };
      return newState;
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
