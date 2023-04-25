import React, { FC } from "react";
import BookWithAuthorNameT from "@/types/BookWithAuthorNameT";
import Image from "next/image";
import { BadgeSuccess } from "../ui/badges";

type Props = {
  book: BookWithAuthorNameT;
};

const SingleBook: FC<Props> = ({ book }) => {
  return (
    <div>
      {/* image  */}
      <div className="w-full h-[300px] relative">
        <Image
          src={book.bookImgUrl}
          alt={book.title}
          fill
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL={book.bookImgUrl}
        />
      </div>
      {/* info */}
      <div className="">
        <h4 className="pt-5 text-lg font-medium leading-6 lg:text-2xl">
          {book.title}
        </h4>
        <p className="pt-1 line-clamp-5 lg:text-xl">{book.description}</p>
        <div className="py-2 flex flex-row items-center gap-2 lg:text-lg">
          <p>{`${book.author.firstName} ${book.author.secondName}`}</p>
          <p> | </p>
          <p>{book.publicationYear}</p>
          <p> | </p>
          <BadgeSuccess>Available</BadgeSuccess>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
