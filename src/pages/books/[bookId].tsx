import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import prisma from "@/utils/prisma";
import SingleBook from "@/components/book/SingleBook";
import { Book } from "@prisma/client";

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
  const bookIds = await prisma.book.findMany({
    select: {
      id: true,
    },
  });
  const paths = bookIds.map((id) => `/books/${id}`);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  if (!context.params) {
    return {
      props: {},
      error: "No context params",
      redirect: "/books",
    };
  }

  const bookId = context.params.bookId;
  const id = Array.isArray(bookId) ? bookId[0] : bookId;

  const book = await prisma.book.findUnique({
    where: {
      id,
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
    console.log(`There is no book with id ${bookId}`);
    return {
      props: {},
      redirect: "/books",
    };
  }

  return {
    props: {
      book,
    },
  };
};

const SingleBookPage: FC<Props> = ({ book }) => {
  return (
    <div className="page-min-height xl:flex xl:items-center xl:justify-left">
      <SingleBook book={book} />
    </div>
  );
};

export default SingleBookPage;
