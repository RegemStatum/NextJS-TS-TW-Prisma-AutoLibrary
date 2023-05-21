import AuthorWithBooksT from "../misc/AuthorWithBooksT";
import {
  AuthorsState,
  AuthorsStatePagination,
  AuthorsStateSearch,
} from "../reducers/AuthorsReducer";

type AuthorsContextValue = AuthorsState & {
  setAuthors: (authors: AuthorWithBooksT[]) => void;
  setIsAuthorsFiltered: (isFiltered: boolean) => void;
  setPagination: (pagination: AuthorsStatePagination) => void;
  setSearch: (search: AuthorsStateSearch) => void;
  setIsAuthorsLoading: (isLoading: boolean) => void;
  handlePageChange: (pageNumber: number) => Promise<void>;
  findAuthor: (authorName: string) => Promise<void>;
};

export default AuthorsContextValue;
