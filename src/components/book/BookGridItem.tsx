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
      rounded-lg  overflow-hidden hover:border-slate-300 hover:shadow-sm"
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
        <div className="px-4 pt-3 pb-4 flex flex-col shrink-0 justify-between">
          {/* title */}
          <h4 className="mb-1 pt-1 font-medium leading-snug line-clamp-2 md:text-xl md:min-h-[60px] ">
            {book.title}
          </h4>
          <div>
            {/* description */}
            <p className="pb-1 text-sm leading-relaxed line-clamp-5 md:text-base lg:text-normal lg:pt-2">
              {book.description}
            </p>
            {/* badges */}
            <div className="py-1 flex flex-row items-center gap-2 text-sm font-medium md:pt-2 md:text-base">
              <p>{`${book.author.firstName} ${book.author.secondName}`}</p>
              <p> | </p>
              <p>{book.publicationYear}</p>
              <p> | </p>
              {book.available && book.currentQuantity > 0 ? (
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
