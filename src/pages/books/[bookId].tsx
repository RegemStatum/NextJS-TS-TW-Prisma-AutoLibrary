import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useEffect } from "react";
import prisma from "@/utils/prisma";
import BookWithAuthorNameT from "@/types/BookWithAuthorNameT";
import SingleBook from "@/components/book/SingleBook";

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

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
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
        },
      },
    },
  });

  return {
    props: {
      book,
    },
  };
};

type Props = {
  book: BookWithAuthorNameT;
};

const SingleBookPage: FC<Props> = ({ book }) => {
  return <SingleBook book={book} />;
};

export default SingleBookPage;
