import React, { FC } from "react";
import Image from "next/image";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import Link from "next/link";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";

type Props = BookWithAuthorNameT;

const Book: FC<Props> = (book) => {
  return (
    <Link href={`books/${book.id}`} className="">
      <div
        className="border border-neutral-200 border-collapse cursor-pointer 
      rounded-lg  overflow-hidden hover:border-neutral-400 hover:shadow-md"
      >
        {/* image  */}
        <div className="w-full h-[300px] relative bg-neutral-100">
          <Image
            src={book.bookImgUrl}
            alt={book.title}
            fill
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="/images/book-placeholder.webp"
          />
        </div>
        {/* info */}
        <div className="p-2 flex flex-col shrink-0 justify-between">
          <h4 className="min-h-[48px] mb-auto py-1 font-medium leading-snug line-clamp-2 lg:text-xl lg:min-h-[56px]">
            {book.title}
          </h4>
          <div>
            <p className="pt-1 text-sm leading-relaxed line-clamp-5 lg:text-normal lg:pt-2">
              {book.description}
            </p>
            <div className="py-2 flex flex-row items-center gap-2 text-sm lg:text-normal">
              <p>{`${book.author.firstName} ${book.author.secondName}`}</p>
              <p> | </p>
              <p>{book.publicationYear}</p>
              <p> | </p>
              {book.available ? (
                <BadgeSuccess>
                  <p>available</p>
                </BadgeSuccess>
              ) : (
                <BadgeError>
                  <p>not available</p>
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
