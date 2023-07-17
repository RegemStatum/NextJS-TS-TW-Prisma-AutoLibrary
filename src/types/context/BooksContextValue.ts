import BookWithAuthorNameT from "../misc/BookWithAuthorNameT";
import {
  BooksState,
  BooksStateFilter,
  BooksStatePagination,
  BooksStateSearch,
  BooksStateSort,
} from "../reducers/BooksReducer";

type BooksContextValue = BooksState & {
  setBooks: (books: BookWithAuthorNameT[]) => void;
  setSort: (sortBy: BooksStateSort) => void;
  setFilter: (filterBy: BooksStateFilter) => void;
  setIsBooksFilterSidebarOpen: (isOpen: boolean) => void;
  setIsBooksFiltered: (isBooksFiltered: boolean) => void;
  setPagination: (pagination: BooksStatePagination) => void;
  setSearch: (search: BooksStateSearch) => void;
  setIsBooksLoading: (isLoading: boolean) => void;
  handlePageChange: (pageNumber: number) => Promise<void>;
};

export default BooksContextValue;
