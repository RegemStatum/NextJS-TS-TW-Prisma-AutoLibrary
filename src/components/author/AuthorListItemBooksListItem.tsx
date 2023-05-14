import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import { BookShortInfo } from "@/types/misc/AuthorWithBooksT";

interface Props {
  book: BookShortInfo;
}

const AuthorListItemBooksListItem: FC<Props> = ({ book }) => {
  return (
    <Link
      href={`/books/${book.id}`}
      key={book.id}
      className="py-1 rounded-md hover:bg-neutral-200 md:pt-3 lg:px-3 lg:py-4"
    >
      <div className="px-1 py-2 flex items-center gap-2 md:gap-3">
        <div className=" w-[100px] h-[100px] rounded-full overflow-hidden relative shrink-0">
          <Image
            src={book.bookImgUrl}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={book.bookImgUrl}
          />
        </div>
        <div className="px-2">
          <h4 className="mb-1 text-base font-medium leading-normal md:text-lg md:leading-snug">
            {book.title}
          </h4>
          {book.available ? (
            <BadgeSuccess className="inline">
              <p className="inline">Available</p>
            </BadgeSuccess>
          ) : (
            <BadgeError className="inline">
              <p className="inline">Not available</p>
            </BadgeError>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AuthorListItemBooksListItem;
