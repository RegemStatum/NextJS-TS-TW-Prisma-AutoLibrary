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
    case AuthorsReducerActionTypes.SET_AUTHORS: {
      const newAuthors = action.payload;
      const newState: AuthorsState = {
        ...state,
        authors: newAuthors,
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
    case AuthorsReducerActionTypes.SET_SEARCH: {
      const newSearch = action.payload;
      const newState: AuthorsState = {
        ...state,
        search: newSearch,
      };
      return newState;
    }
    case AuthorsReducerActionTypes.SET_PAGINATION: {
      const newPagination = action.payload;
      const newState: AuthorsState = {
        ...state,
        pagination: newPagination,
      };
      return newState;
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
