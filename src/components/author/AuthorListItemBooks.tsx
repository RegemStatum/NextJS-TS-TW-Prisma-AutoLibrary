import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import AuthorWithBooksT from "@/types/AuthorWithBooksT";

type Props = Pick<AuthorWithBooksT, "books">;

const AuthorListItemBooks: FC<Props> = ({ books }) => {
  return (
    <div className="flex flex-col gap-4">
      {books.map((book, index) => {
        return (
          <Link href={`/books/${book.id}`} key={book.id} className="pt-4">
            <div className="flex gap-2">
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
                <h4 className="mb-2 font-bold ">{book.title}</h4>
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
            {/* separator */}
            {index !== books.length - 1 ? (
              <div className="w-5/6 mx-auto mt-7 h-0.5 bg-slate-300"></div>
            ) : (
              <div className="mb-7"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default AuthorListItemBooks;
