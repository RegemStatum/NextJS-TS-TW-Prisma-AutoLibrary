import { GetStaticProps } from "next";
import React, { FC, useEffect, useRef } from "react";
import prisma from "@/utils/prisma";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import Head from "next/head";
import { BOOKS_PER_PAGE, CACHED_BOOKS_TTL_SEC } from "@/utils/constants/misc";
import { NotFoundError } from "@/utils/errors";
import { useBooksContext } from "@/context/BooksContext";
import Books from "@/components/book/Books";

type Props = {
  books: BookWithAuthorNameT[];
  lastPageNumber: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
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

    const lastPageNumber = Math.ceil(totalBooksAmount / BOOKS_PER_PAGE);

    return {
      props: { books, lastPageNumber },
      revalidate: CACHED_BOOKS_TTL_SEC,
    };
  } catch (e) {
    console.log(e);
    const books = await prisma.book.findMany({
      orderBy: [
        {
          publicationYear: "desc",
        },
      ],
      include: {
        author: {
          select: {
            firstName: true,
            secondName: true,
          },
        },
      },
      take: BOOKS_PER_PAGE,
    });
    const totalBooksAmount = await prisma.book.count();
    const lastPageNumber = Math.ceil(totalBooksAmount / BOOKS_PER_PAGE);
    return {
      props: { books, lastPageNumber },
      revalidate: CACHED_BOOKS_TTL_SEC,
    };
  }
};

const BooksPage: FC<Props> = ({
  books: propsBooks,
  lastPageNumber: propsLastPageNumber,
}) => {
  const { setBooks, setPagination } = useBooksContext();
  let isRenderedFirstTime = useRef(true);

  // set books reducer books and last page number on first render
  useEffect(() => {
    if (!isRenderedFirstTime.current) return;
    isRenderedFirstTime.current = false;
    setBooks(propsBooks);
    setPagination({
      currentPageNumber: 1,
      lastPageNumber: propsLastPageNumber,
    });
  }, [setPagination, propsLastPageNumber, setBooks, propsBooks]);

  return (
    <>
      <Head>
        <title>Autolib | Books</title>
        <meta name="description" content="Autolib books page" />
      </Head>
      <div className="page-min-height">
        <Books
          isRenderedFirstTime={isRenderedFirstTime.current}
          initialBooks={propsBooks}
          initialLastPageNumber={propsLastPageNumber}
        />
      </div>
    </>
  );
};

export default BooksPage;
