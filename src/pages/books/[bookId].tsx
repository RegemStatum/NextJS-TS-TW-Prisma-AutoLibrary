import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import prisma from "@/utils/prisma";
import SingleBook from "@/components/book/SingleBook";
import { Book } from "@prisma/client";
import Head from "next/head";

interface SingleBookT extends Book {
  author: {
    firstName: string;
    secondName: string;
    authorImgUrl: string;
  };
}

type Props = {
  book?: SingleBookT;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });
  const paths = books.map((book) => `/books/${book.id}`);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  if (!context.params || !context.params.bookId) {
    return {
      props: {},
      redirect: "/books",
    };
  }

  const bookId = context.params.bookId;

  if (typeof bookId !== "string") {
    throw new Error("Book id must be of string type");
  }

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      author: {
        select: {
          firstName: true,
          secondName: true,
          authorImgUrl: true,
        },
      },
    },
  });

  if (!book) {
    return {
      props: {},
      redirect: "/books",
    };
  }

  return {
    props: {
      book,
    },
    revalidate: 86400, // 24hrs
  };
};

const SingleBookPage: FC<Props> = ({ book }) => {
  return (
    <>
      <Head>
        <title>{`Autolib | ${book?.title || "Book"}`}</title>
        <meta
          name="description"
          content={book?.description || "Autolib single book page"}
        />
      </Head>
      <div className="page-min-height xl:flex xl:items-center xl:justify-left">
        <SingleBook book={book} />
      </div>
    </>
  );
};

export default SingleBookPage;
