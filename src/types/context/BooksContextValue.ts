import BookWithAuthorNameT from "../misc/BookWithAuthorNameT";
import {
  BooksState,
  BooksStateFilter,
  BooksStateSort,
} from "../reducers/BooksReducer";

type BooksContextValue = BooksState & {
  setBooks: (books: BookWithAuthorNameT[]) => void;
  setSort: (sortBy: BooksStateSort) => void;
  setFilter: (filterBy: BooksStateFilter) => void;
};

export default BooksContextValue;
