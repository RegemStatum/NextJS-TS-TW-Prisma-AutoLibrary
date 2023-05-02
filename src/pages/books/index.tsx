import { GetStaticProps } from "next";
import React, { FC } from "react";
import prisma from "@/utils/prisma";
import BookGrid from "@/components/book/BookGrid";
import BookWithAuthorNameT from "@/types/BookWithAuthorNameT";

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
  return <BookGrid books={books} />;
};

export default BooksPage;
