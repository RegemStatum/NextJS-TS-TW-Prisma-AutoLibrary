import { Book } from "@prisma/client";
import { Author } from "@prisma/client";

export type BookShortInfo = Pick<
  Book,
  "title" | "bookImgUrl" | "available" | "id"
>;

interface AuthorWithBooksT extends Author {
  books: BookShortInfo[];
}

export default AuthorWithBooksT;
