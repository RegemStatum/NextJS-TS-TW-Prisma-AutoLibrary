import { GetStaticProps } from "next";
import React, { FC, useEffect, useRef } from "react";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import Head from "next/head";
import { BOOKS_PER_PAGE, CACHED_BOOKS_TTL_SEC } from "@/utils/constants/misc";
import { useBooksContext } from "@/context/BooksContext";
import Books from "@/components/book/Books";
import getBooksPageInitialProps from "@/utils/helpers/getBooksPageInitialProps";
import BooksFilterData from "@/types/misc/BooksFilterData";

type Props = {
  books: BookWithAuthorNameT[];
  lastPageNumber: number;
  filterData: BooksFilterData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const initialProps = await getBooksPageInitialProps();
    const [
      books,
      totalBooksAmount,
      authors,
      covers,
      languages,
      publishers,
      maxPublicationYear,
      minPublicationYear,
    ] = initialProps;

    const lastPageNumber = Math.ceil(totalBooksAmount / BOOKS_PER_PAGE);
    const filterData = {
      authors,
      covers,
      languages,
      publishers,
      maxPublicationYear,
      minPublicationYear,
    };

    return {
      props: {
        books,
        lastPageNumber,
        authors,
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
          covers: [],
          languages: [],
          publishers: [],
          maxPublicationYear: -1,
          minPublicationYear: -1,
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
