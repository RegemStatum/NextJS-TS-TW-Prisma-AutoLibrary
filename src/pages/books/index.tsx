import { GetStaticProps } from "next";
import React, { FC, useEffect, useRef } from "react";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import Head from "next/head";
import { BOOKS_PER_PAGE, CACHED_BOOKS_TTL_SEC } from "@/utils/constants/misc";
import { useBooksContext } from "@/context/BooksContext";
import Books from "@/components/book/Books";
import BooksFilterData from "@/types/misc/BooksFilterData";
import prisma from "@/utils/prisma";
import NotFoundError from "@/utils/errors/NotFoundError";

type Props = {
  books: BookWithAuthorNameT[];
  lastPageNumber: number;
  filterData: BooksFilterData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    // books
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
    });

    const indexToStartWith = 0;
    const indexToEndWith = indexToStartWith + BOOKS_PER_PAGE;
    const booksOnPage = books.slice(indexToStartWith, indexToEndWith);

    // last page number
    const lastPageNumber = Math.ceil(books.length / BOOKS_PER_PAGE);

    // filter data
    // - authors
    const prismaAuthors = await prisma.author.findMany({
      select: {
        firstName: true,
        secondName: true,
      },
    });
    if (!prismaAuthors) {
      throw new NotFoundError("Authors were not found");
    }

    const authors = prismaAuthors.map((author) => {
      const fullName = `${author.firstName} ${author.secondName}`;
      return fullName;
    });

    // - publishers
    const prismaPublishers = await prisma.book.findMany({
      select: {
        publisher: true,
      },
      distinct: ["publisher"],
    });
    if (!prismaPublishers) {
      throw new NotFoundError("Publishers not found");
    }

    const publishers = prismaPublishers.map(
      (publisherObj) => publisherObj.publisher
    );

    const filterData = {
      authors,
      publishers,
    };

    return {
      props: {
        books: booksOnPage,
        lastPageNumber,
        filterData,
      },
      revalidate: CACHED_BOOKS_TTL_SEC,
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        books: [],
        lastPageNumber: -1,
        filterData: {
          authors: [],
          publishers: [],
        },
      },
    };
  }
};

const BooksPage: FC<Props> = ({
  books: propsBooks,
  lastPageNumber: propsLastPageNumber,
  filterData,
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
          filterData={filterData}
        />
      </div>
    </>
  );
};

export default BooksPage;
