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
    case BooksReducerActionTypes.SET_IS_FILTER_SIDEBAR_OPEN: {
      const newIsFilterSidebarOpen = action.payload;
      const newState: BooksState = {
        ...state,
        isFilterSidebarOpen: newIsFilterSidebarOpen,
      };
      return newState;
    }
    case BooksReducerActionTypes.SET_IS_BOOKS_FILTERED: {
      const newIsBooksFiltered = action.payload;
      const newState: BooksState = {
        ...state,
        isBooksFiltered: newIsBooksFiltered,
      };
      return newState;
    }
    case BooksReducerActionTypes.SET_PAGINATION: {
      const newPagination = action.payload;
      const newState: BooksState = {
        ...state,
        pagination: newPagination,
      };
      return newState;
    }
    case BooksReducerActionTypes.SET_SEARCH: {
      const newSearch = action.payload;
      const newState: BooksState = {
        ...state,
        search: newSearch,
      };
      return newState;
    }
    case BooksReducerActionTypes.SET_IS_BOOKS_LOADING: {
      const newIsLoading = action.payload;
      const newState: BooksState = {
        ...state,
        isBooksLoading: newIsLoading,
      };
      return newState;
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
