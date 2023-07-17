import React, { FC } from "react";
import Image from "next/image";
import { BadgeError, BadgeInfo, BadgeSuccess } from "../ui/badges";
import Link from "next/link";
import BookWithAuthorNameT from "@/types/misc/BookWithAuthorNameT";

type Props = BookWithAuthorNameT;

const BooksGridItem: FC<Props> = (book) => {
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
        <div className="px-4 pt-3 pb-4 flex flex-col shrink-0 justify-between md:px-6 md:pt-4 lg:pb-5">
          {/* title */}
          <h4 className="mb-1 pt-1 font-medium line-clamp-1 md:text-xl">
            {book.title}
          </h4>
          <div>
            {/* description */}
            <p className="pb-1 text-sm leading-relaxed line-clamp-5 md:text-base lg:text-normal md:pt-2">
              {book.description}
            </p>
            {/* badges */}
            <div className="py-1 flex flex-row flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium md:pt-2 md:text-base">
              <p>{`${book.author.firstName} ${book.author.secondName}`}</p>
              <p> | </p>
              {book.available && book.currentQuantity > 0 ? (
                <BadgeSuccess>available</BadgeSuccess>
              ) : (
                <BadgeError>not available</BadgeError>
              )}
              {book.featured && (
                <>
                  <p> | </p>
                  <BadgeInfo>featured</BadgeInfo>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BooksGridItem;
