import AuthorWithBooksT from "../misc/AuthorWithBooksT";
import { AuthorsState } from "../reducers/AuthorsReducer";

type AuthorsContextValue = AuthorsState & {
  startAuthorsLoading: () => void;
  endAuthorsLoading: () => void;
  setAuthors: (authors: AuthorWithBooksT[]) => void;
  setLastPageNumber: (pageNumber: number) => void;
  setAuthorsForPage: (pageNumber: number) => Promise<void>;
  setCurrentPageNumber: (pageNumber: number) => void;
  setSearchInputValue: (value: string) => void;
  findAuthors: (query: string) => Promise<void>;
  setInitialAuthors: () => void;
  setIsAuthorsFiltered: (isFiltered: boolean) => void;
};

export default AuthorsContextValue;
