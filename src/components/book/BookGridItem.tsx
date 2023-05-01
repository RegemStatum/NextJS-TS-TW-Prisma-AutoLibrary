import React, { FC } from "react";
import Image from "next/image";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import Link from "next/link";
import BookWithAuthorNameT from "@/types/BookWithAuthorNameT";

type Props = BookWithAuthorNameT;

const Book: FC<Props> = (book) => {
  return (
    <Link href={`books/${book.id}`} className="">
      <div className="border border-stone-200 border-collapse cursor-pointer hover:border-stone-400 hover:shadow-md">
        {/* image  */}
        <div className="w-full h-[300px] relative bg-stone-100">
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
        <div className="p-3 flex flex-col shrink-0 justify-between">
          <h4 className="min-h-[48px] mb-auto text-lg font-medium leading-snug line-clamp-2 lg:text-xl lg:min-h-[56px] lg:pt-1">
            {book.title}
          </h4>
          <div>
            <p className="pt-1 line-clamp-5 lg:text-lg lg:pt-2">
              {book.description}
            </p>
            <div className="py-2 flex flex-row items-center gap-2 lg:text-lg">
              <p className="font-medium">{`${book.author.firstName} ${book.author.secondName}`}</p>
              <p> | </p>
              <p className="font-medium">{book.publicationYear}</p>
              <p> | </p>
              {book.available ? (
                <BadgeSuccess>
                  <p>Available</p>
                </BadgeSuccess>
              ) : (
                <BadgeError>
                  <p>Not available</p>
                </BadgeError>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
