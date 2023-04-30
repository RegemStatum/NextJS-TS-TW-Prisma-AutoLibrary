import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useEffect } from "react";
import prisma from "@/utils/prisma";
import SingleBook from "@/components/book/SingleBook";
import { Book } from "@prisma/client";

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
          authorImgUrl: true,
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

interface SingleBookT extends Book {
  author: {
    firstName: string;
    secondName: string;
    authorImgUrl: string;
  };
}

type Props = {
  book: SingleBookT;
};

const SingleBookPage: FC<Props> = ({ book }) => {
  return (
    <div className="page-min-height xl:flex xl:items-center xl:justify-left">
      <SingleBook book={book} />
    </div>
  );
};

export default SingleBookPage;
