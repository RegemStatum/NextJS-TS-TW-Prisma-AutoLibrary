import React, { FC, useEffect, useRef } from "react";
import prisma from "@/utils/prisma";
import { GetStaticProps } from "next";
import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";
import Head from "next/head";
import Authors from "@/components/author/Authors";
import {
  AUTHORS_PER_PAGE,
  CACHED_AUTHORS_TTL_SEC,
} from "@/utils/constants/misc";
import { useAuthorsContext } from "@/context/AuthorsContext";
import { NotFoundError } from "@/utils/errors";

type Props = {
  authors: AuthorWithBooksT[];
  lastPageNumber: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/authors/paginate/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const authors = data.authors;
    if (!authors) {
      throw new NotFoundError(
        "getStaticProps was not able to fetch authors paginate api correctly. No authors"
      );
    }
    const totalAuthorsAmount = data.totalAuthorsAmount;
    if (!totalAuthorsAmount) {
      throw new NotFoundError(
        "getStaticProps was not able to fetch authors paginate api correctly. No total authors amount"
      );
    }

    const lastPageNumber = Math.ceil(totalAuthorsAmount / AUTHORS_PER_PAGE);

    return {
      props: { authors, lastPageNumber },
      revalidate: CACHED_AUTHORS_TTL_SEC,
    };
  } catch (e: any) {
    console.log(e);
    const authors = await prisma.author.findMany({
      include: {
        books: {
          where: {
            featured: true,
          },
          select: {
            title: true,
            bookImgUrl: true,
            available: true,
            id: true,
          },
        },
      },
      take: AUTHORS_PER_PAGE,
    });
    const authorsToJson = authors.map((author) => {
      const newAuthor = {
        ...author,
        birthDate: JSON.stringify(author.birthDate),
        deathDate: JSON.stringify(author.deathDate),
      };
      return newAuthor;
    });
    const authorsCount = await prisma.author.count();
    const lastPageNumber = Math.ceil(authorsCount / AUTHORS_PER_PAGE);
    return {
      props: { authors: authorsToJson, lastPageNumber },
      revalidate: CACHED_AUTHORS_TTL_SEC,
    };
  }
};

const AuthorsPage: FC<Props> = ({ authors, lastPageNumber }) => {
  const { setAuthors, setPagination } = useAuthorsContext();
  const isRenderedFirstTime = useRef(true);

  // set authors reducer authors and last page number on first render
  useEffect(() => {
    if (!isRenderedFirstTime) return;
    isRenderedFirstTime.current = false;
    setAuthors(authors);
    setPagination({
      currentPageNumber: 1,
      lastPageNumber: lastPageNumber,
    });
  }, [setPagination, setAuthors, authors, lastPageNumber]);

  return (
    <>
      <Head>
        <title>Autolib | Authors</title>
        <meta name="description" content="Autolib authors" />
      </Head>
      <div className="page-min-height">
        <Authors
          isRenderedFirstTime={isRenderedFirstTime.current}
          initialAuthors={authors}
          initialLastPageNumber={lastPageNumber}
        />
      </div>
    </>
  );
};

export default AuthorsPage;
