import { BooksStateSort } from "@/types/reducers/BooksReducer";

const checkIsBooksStateSort = (sortBy: string): sortBy is BooksStateSort => {
  return sortBy === "YEAR_ASC" || sortBy === "YEAR_DESC";
};

export default checkIsBooksStateSort;
