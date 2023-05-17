import { GetStaticProps } from "next";
import React, { FC } from "react";
import prisma from "@/utils/prisma";
import BookGrid from "@/components/book/BookGrid";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import Head from "next/head";

type Props = {
  books: BookWithAuthorNameT[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
  });

  return {
    props: { books },
    revalidate: 86400,
  };
};

const BooksPage: FC<Props> = ({ books }) => {
  return (
    <>
      <Head>
        <title>Autolib | Books</title>
        <meta name="description" content="Autolib books page" />
      </Head>
      <BookGrid books={books} />
    </>
  );
};

export default BooksPage;
