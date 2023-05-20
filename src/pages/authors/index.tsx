import React, { FC, useEffect } from "react";
import prisma from "@/utils/prisma";
import { GetStaticProps } from "next";
import AuthorWithBooksT from "@/types/misc/AuthorWithBooksT";
import Head from "next/head";
import Authors from "@/components/author/Authors";
import { AUTHORS_PER_PAGE } from "@/utils/constants/misc";
import { useAuthorsContext } from "@/context/AuthorsContext";

type Props = {
  authors: AuthorWithBooksT[];
  lastPageNumber: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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
    revalidate: 86400,
  };
};

const AuthorsPage: FC<Props> = ({ authors, lastPageNumber }) => {
  const {
    setAuthors,
    setLastPageNumber,
    setCurrentPageNumber,
    startAuthorsLoading,
    endAuthorsLoading,
  } = useAuthorsContext();

  // warning page is not being prerendered with authors
  useEffect(() => {
    startAuthorsLoading();
    setAuthors(authors);
    setCurrentPageNumber(1);
    setLastPageNumber(lastPageNumber);
    endAuthorsLoading();
  }, [
    setCurrentPageNumber,
    setAuthors,
    authors,
    setLastPageNumber,
    lastPageNumber,
    startAuthorsLoading,
    endAuthorsLoading,
  ]);

  return (
    <>
      <Head>
        <title>Autolib | Authors</title>
        <meta name="description" content="Autolib authors" />
      </Head>
      <div className="page-min-height">
        <Authors />
      </div>
    </>
  );
};

export default AuthorsPage;
