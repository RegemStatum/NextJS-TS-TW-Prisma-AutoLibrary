import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import SingleBookDescription from "./SingleBookDescription";
import SingleBookInfo from "./SingleBookInfo";
import { Book } from "@prisma/client";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import SingleBookBadges from "./SingleBookBadges";
import { useCartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { BadgeError } from "../ui/badges";
import Link from "next/link";
import SingleBookNotFound from "./SingleBookNotFound";

interface SingleBookT extends Book {
  author: {
    firstName: string;
    secondName: string;
    authorImgUrl: string;
  };
}

type Props = {
  book?: SingleBookT;
};

const SingleBook: FC<Props> = ({ book }) => {
  const { data: session } = useSession();
  const cartContext = useCartContext();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!book) return;
    const isBookInCart =
      cartContext.cartBooksIds.findIndex((bookId) => bookId === book.id) !== -1;
    setIsAlreadyInCart(isBookInCart);
  }, [cartContext.cartBooksIds, book]);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (errorMsg !== "") {
      timer = setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!book) {
    return <SingleBookNotFound />;
  }

  const bookInfo = {
    id: book.id,
    publisher: book.publisher,
    publicationYear: book.publicationYear,
    ISBN10: book.ISBN10,
    cover: book.cover,
    language: book.language,
    available: book.available,
    featured: book.featured,
    currentQuantity: book.currentQuantity,
    maxQuantity: book.maxQuantity,
    author: {
      firstName: book.author.firstName,
      secondName: book.author.secondName,
      authorImgUrl: book.author.authorImgUrl,
    },
  };

  const handleOrderBook = () => {
    try {
      cartContext.addBookToCart(book.id);
      setIsAlreadyInCart(true);
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  return (
    <div>
      <div className="xl:flex xl:justify-between xl:mb-2 xl:gap-8">
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
            quantity={book.currentQuantity}
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
      <div className="mb-3 xl:w-[500px]">
        <div className="flex flex-col gap-1 lg:flex-row">
          <PrimaryButton
            onClick={() => handleOrderBook()}
            disabled={
              book.currentQuantity <= 0 ||
              !book.available ||
              isAlreadyInCart ||
              !session?.user
            }
          >
            {!session?.user
              ? "Sign in to access"
              : isAlreadyInCart
              ? "Already in cart"
              : "Add to cart"}
          </PrimaryButton>
          <Link href="/books" className="w-[calc(50%_-_8px)] block shrink-0">
            <SecondaryButton>Back to all books</SecondaryButton>
          </Link>
        </div>
        {errorMsg && <BadgeError className="mt-2">{errorMsg}</BadgeError>}
      </div>
      <SingleBookInfo book={bookInfo} authorId={book.authorId} />
    </div>
  );
};

export default SingleBook;
