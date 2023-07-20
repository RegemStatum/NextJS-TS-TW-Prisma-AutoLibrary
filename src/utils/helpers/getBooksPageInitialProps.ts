import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import { NotFoundError } from "../errors";

const getInitialBooks = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/books/paginate/1?sortBy=YEAR_DESC`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const books = data.books;
  if (!books) {
    throw new NotFoundError(
      "getStaticProps was not able to fetch books paginate api correctly. No books"
    );
  }
  const totalBooksAmount = data.totalBooksAmount;
  if (!totalBooksAmount) {
    throw new NotFoundError(
      "getStaticProps was not able to fetch books paginate api correctly. No total books amount"
    );
  }
  return [books, totalBooksAmount];
};

const getAllCovers = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/books/getAllCovers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const covers = data.covers;
  if (!covers) {
    throw new NotFoundError("No covers found");
  }
  return covers;
};

const getAllLanguages = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/books/getAllLanguages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const languages = data.languages;
  if (!languages) {
    throw new NotFoundError("No languages found");
  }
  return languages;
};

const getAllPublishers = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/books/getAllPublishers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const publishers = data.publishers;
  if (!publishers) {
    throw new NotFoundError("No publishers found");
  }
  return publishers;
};

const getMaxPublicationYear = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/books/getMaxPublicationYear`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const maxPublicationYear = data.maxPublicationYear;
  if (!maxPublicationYear) {
    throw new NotFoundError("No maxPublicationYear found");
  }
  return maxPublicationYear;
};

const getMinPublicationYear = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/books/getMinPublicationYear`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const minPublicationYear = data.minPublicationYear;
  if (!minPublicationYear) {
    throw new NotFoundError("No minPublicationYear found");
  }
  return minPublicationYear;
};

const getAllAuthorNames = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/authors/getAllAuthorNames`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const authorNames = data.authorNames;
  if (!authorNames) {
    throw new NotFoundError("No author names found");
  }
  return authorNames;
};

type BooksInitialProps = [
  books: BookWithAuthorNameT[],
  totalBooksAmount: number,
  authors: string[],
  covers: string[],
  languages: string[],
  publishers: string[],
  maxPublicationYear: number,
  minPublicationYear: number
];

type GetBooksInitialProps = () => Promise<BooksInitialProps>;

const getBooksPageInitialProps: GetBooksInitialProps = async () => {
  const [books, totalBooksAmount] = await getInitialBooks();
  const authors = await getAllAuthorNames();
  const covers = await getAllCovers();
  const languages = await getAllLanguages();
  const publishers = await getAllPublishers();
  const maxPublicationYear = await getMaxPublicationYear();
  const minPublicationYear = await getMinPublicationYear();

  const initialProps: BooksInitialProps = [
    books,
    totalBooksAmount,
    authors,
    covers,
    languages,
    publishers,
    maxPublicationYear,
    minPublicationYear,
  ];

  console.log("Initial props: ", initialProps);

  return initialProps;
};

export default getBooksPageInitialProps;
