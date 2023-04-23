import { Book } from "@prisma/client";
import { Author } from "@prisma/client";

type AuthorName = Pick<Author, "firstName" | "secondName">;

interface BookWithAuthorNameT extends Book {
  author: AuthorName;
}
export default BookWithAuthorNameT;
