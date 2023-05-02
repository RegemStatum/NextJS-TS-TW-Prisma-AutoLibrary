import Home from "@/components/home/Home";
import BookWithAuthorNameT from "@/types/BookWithAuthorNameT";
import prisma from "@/utils/prisma";
import { GetStaticProps } from "next";
import React, { FC } from "react";

type Props = {
  books: BookWithAuthorNameT[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const books = await prisma.book.findMany({
    where: {
      featured: true,
    },
    take: 3,
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

const HomePage: FC<Props> = ({ books }) => {
  return (
    <div className="page-min-height">
      <Home books={books} />
    </div>
  );
};

export default HomePage;
