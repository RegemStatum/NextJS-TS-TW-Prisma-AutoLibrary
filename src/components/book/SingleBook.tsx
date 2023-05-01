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
  const { data: session } = useSession();
  const cartContext = useCartContext();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isBookInCart =
      cartContext.cartBooksIds.findIndex((bookId) => bookId === book.id) !== -1;
    setIsAlreadyInCart(isBookInCart);
  }, [cartContext.cartBooksIds, book.id]);

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

  const handleOrderBook = () => {
    try {
      cartContext.addBookToCart(book.id);
      setIsAlreadyInCart(true);
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (errorMsg !== "") {
      timer = setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMsg]);

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
      <div className="xl:w-[500px] space-y-1 xl:space-y-2">
        <PrimaryButton
          onClick={() => handleOrderBook()}
          disabled={
            book.quantity <= 0 ||
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
        <Link href="/books" className="block mb-3">
          <SecondaryButton>Back to all books</SecondaryButton>
        </Link>
        {errorMsg && <BadgeError>{errorMsg}</BadgeError>}
      </div>
      <SingleBookInfo book={bookInfo} authorId={book.authorId} />
    </div>
  );
};

export default SingleBook;
