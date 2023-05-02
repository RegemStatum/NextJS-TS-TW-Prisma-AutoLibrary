import React, { FC } from "react";
import prisma from "@/utils/prisma";
import { GetStaticProps } from "next";
import AuthorWithBooksT from "@/types/AuthorWithBooksT";
import AuthorList from "@/components/author/AuthorList";
import Head from "next/head";

type Props = {
  authors: AuthorWithBooksT[];
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
  });

  const authorsToJson = authors.map((author) => {
    const newAuthor = {
      ...author,
      birthDate: JSON.stringify(author.birthDate),
      deathDate: JSON.stringify(author.deathDate),
    };
    return newAuthor;
  });

  return {
    props: { authors: authorsToJson },
    revalidate: 86400,
  };
};

const AuthorsPage: FC<Props> = ({ authors }) => {
  return (
    <>
      <Head>
        <title>Auto Library | Authors</title>
        <meta name="description" content="Auto Library authors" />
      </Head>
      <div className="page-min-height">
        <AuthorList authors={authors} />
      </div>
    </>
  );
};

export default AuthorsPage;
