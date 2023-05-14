import React, { FC } from "react";
import { Book } from "@prisma/client";
import AuthorListItemInfo from "../author/AuthorListItemInfo";
import Link from "next/link";
import SingleBookOtherInfo from "./SingleBookOtherInfo";

type SingleBookInfoWithoutAuthorT = Omit<
  Book,
  "bookImgUrl" | "title" | "description" | "authorId"
>;

interface SingleBookInfoT extends SingleBookInfoWithoutAuthorT {
  author: {
    firstName: string;
    secondName: string;
    authorImgUrl: string;
  };
}

type Props = {
  book: SingleBookInfoT;
  authorId: string;
};

const SingleBookInfo: FC<Props> = ({ book, authorId }) => {
  const authorInfo = {
    firstName: book.author.firstName,
    secondName: book.author.secondName,
    authorImgUrl: book.author.authorImgUrl,
  };

  const otherInfo = [
    { id: 1, name: "Publisher", info: book.publisher },
    { id: 2, name: "Publication year", info: String(book.publicationYear) },
    { id: 3, name: "Language", info: book.language },
    { id: 4, name: "Cover", info: book.cover },
    { id: 5, name: "ISBN10", info: String(book.ISBN10) },
  ];

  return (
    <div>
      {/* author */}
      <Link href={`/authors#${authorId}`}>
        <div className="my-2 p-2 rounded-md  hover:bg-neutral-100 md:my-4 md:p-4 xl:p-4">
          <AuthorListItemInfo authorInfo={authorInfo} />
        </div>
      </Link>
      {/* other info */}
      <div className="py-2">
        <SingleBookOtherInfo infoArr={otherInfo} />
      </div>
    </div>
  );
};

export default SingleBookInfo;
