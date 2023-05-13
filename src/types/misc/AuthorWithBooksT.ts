import { Book } from "@prisma/client";
import { Author } from "@prisma/client";

export type BookShortInfo = Pick<
  Book,
  "title" | "bookImgUrl" | "available" | "id"
>;

interface AuthorWithStringifiedDates
  extends Omit<Author, "birthDate" | "deathDate"> {
  birthDate: string;
  deathDate: string | null;
}

interface AuthorWithBooksT extends AuthorWithStringifiedDates {
  books: BookShortInfo[];
}

export default AuthorWithBooksT;
