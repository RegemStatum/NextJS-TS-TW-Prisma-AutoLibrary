import BookWithAuthorNameT from "../misc/BookWithAuthorNameT";
import {
  BooksState,
  BooksStateFilter,
  BooksStatePagination,
  BooksStateSearch,
  BooksStateSort,
  BooksStateSortLabel,
} from "../reducers/BooksReducer";

type BooksContextValue = BooksState & {
  setBooks: (books: BookWithAuthorNameT[]) => void;
  setSort: (sortBy: BooksStateSort) => void;
  setSortLabel: (sortLabel: BooksStateSortLabel) => void;
  setFilter: (filterBy: BooksStateFilter) => void;
  setIsBooksFilterSidebarOpen: (isOpen: boolean) => void;
  setIsBooksFiltered: (isBooksFiltered: boolean) => void;
  setPagination: (pagination: BooksStatePagination) => void;
  setSearch: (search: BooksStateSearch) => void;
  setIsBooksLoading: (isLoading: boolean) => void;
  handlePageChange: (
    pageNumber: number,
    filterOptions?: BooksStateFilter
  ) => Promise<void>;
  resetFilter: () => void;
};

export default BooksContextValue;
