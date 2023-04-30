import React, { FC } from "react";
import Image from "next/image";
import SingleBookDescription from "./SingleBookDescription";
import SingleBookInfo from "./SingleBookInfo";
import { Book } from "@prisma/client";
import { PrimaryButton } from "../ui/buttons";
import SingleBookBadges from "./SingleBookBadges";

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

const SingleBook: FC<Props> = ({ book }) => {
  const bookInfo = {
    id: book.id,
    publisher: book.publisher,
    publicationYear: book.publicationYear,
    ISBN10: book.ISBN10,
    cover: book.cover,
    language: book.language,
    available: book.available,
    featured: book.featured,
    quantity: book.quantity,
    author: {
      firstName: book.author.firstName,
      secondName: book.author.secondName,
      authorImgUrl: book.author.authorImgUrl,
    },
  };

  const handleOrderBook = () => {};

  return (
    <div>
      <div className="xl:flex xl:justify-between xl:mb-3 xl:gap-8">
        <div className="">
          {/* image  */}
          <div className="w-full h-[400px] my-2 bg-stone-100 relative xl:w-[500px]">
            <Image
              src={book.bookImgUrl}
              alt={book.title}
              fill
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL={book.bookImgUrl}
            />
          </div>
          {/* badges [featured, quantity, available]*/}
          <SingleBookBadges
            featured={book.featured}
            quantity={book.quantity}
            available={book.available}
          />
        </div>
        {/* info */}
        <div className="">
          <h1 className="pt-2 text-lg font-medium leading-6 lg:text-3xl lg:py-3 xl:max-w-[750px] ">
            {book.title}
          </h1>
          <SingleBookDescription description={book.description} />
        </div>
      </div>
      <PrimaryButton
        className="mb-3 xl:w-[500px]"
        onClick={() => handleOrderBook()}
      >
        Order
      </PrimaryButton>
      <SingleBookInfo book={bookInfo} />
    </div>
  );
};

export default SingleBook;
