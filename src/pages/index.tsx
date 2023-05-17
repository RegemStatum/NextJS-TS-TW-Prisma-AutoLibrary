import Home from "@/components/home/Home";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";
import prisma from "@/utils/prisma";
import { GetStaticProps } from "next";
import Head from "next/head";
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
    <>
      <Head>
        <title>Autolib | Home</title>
        <meta
          name="description"
          content="Autolib home page. Autolib - Automatic issue & acceptance of books Bored of common libraries? Visit our Autolib — library with automatic issue & acceptance of books. Here you will be able to get any book in our library automatically without any boring conversations"
        />
      </Head>
      <div className="page-min-height">
        <Home books={books} />
      </div>
    </>
  );
};

export default HomePage;
