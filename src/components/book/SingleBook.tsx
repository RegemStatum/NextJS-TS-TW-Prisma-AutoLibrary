import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import SingleBookDescription from "./SingleBookDescription";
import SingleBookInfo from "./SingleBookInfo";
import { Book } from "@prisma/client";
import SingleBookBadges from "./SingleBookBadges";
import { useCartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import SingleBookNotFound from "./SingleBookNotFound";
import SingleBookControlButtons from "./SingleBookControlButtons";
import { HIDE_AFTER_SHORT_MSEC } from "@/utils/constants/misc";
import { useAppContext } from "@/context/AppContext";

interface SingleBookT extends Book {
  author: {
    firstName: string;
    secondName: string;
    authorImgUrl: string;
  };
}

type Props = {
  book: SingleBookT | undefined;
};

const SingleBook: FC<Props> = ({ book }) => {
  const { data: session } = useSession();
  const { showInfoMessage } = useAppContext();
  const cartContext = useCartContext();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [currentBookQuantity, setCurrentBookQuantity] = useState(
    book?.currentQuantity || -1
  );

  // update current book quantity on page load
  useEffect(() => {
    if (!book) return;
    // get book current quantity
    const getBookCurrentQuantity = async () => {
      const res = await fetch(`/api/books/${book.id}/getCurrentQuantity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: { currentQuantity: number; msg: string } = await res.json();
      setCurrentBookQuantity(data.currentQuantity);
    };
    try {
      getBookCurrentQuantity();
    } catch (e: any) {
      console.log(e);
    }
  }, [book]);

  // check if book is already in cart
  useEffect(() => {
    if (!book) return;
    const isBookInCart =
      cartContext.cartBooksIds.findIndex((bookId) => bookId === book.id) !== -1;
    setIsAlreadyInCart(isBookInCart);
  }, [cartContext.cartBooksIds, book]);

  if (!book) {
    return <SingleBookNotFound />;
  }

  // this object can be passed down to SingleBookInfo component
  // const bookInfo = {
  //   id: book.id,
  //   publisher: book.publisher,
  //   publicationYear: book.publicationYear,
  //   ISBN10: book.ISBN10,
  //   cover: book.cover,
  //   language: book.language,
  //   available: book.available,
  //   featured: book.featured,
  //   currentQuantity: book.currentQuantity,
  //   maxQuantity: book.maxQuantity,
  //   author: {
  //     firstName: book.author.firstName,
  //     secondName: book.author.secondName,
  //     authorImgUrl: book.author.authorImgUrl,
  //   },
  // };

  const handleOrderBook = () => {
    try {
      cartContext.addBookToCart(book.id);
      setIsAlreadyInCart(true);
      showInfoMessage(
        "success",
        "Book added to your cart",
        HIDE_AFTER_SHORT_MSEC
      );
    } catch (e: any) {
      showInfoMessage(
        "pending",
        e.message || "Book was not added to your cart. Try again later"
      );
    }
  };

  if (!book) {
    return <p>There is no book</p>;
  }

  return (
    <div>
      <div className="xl:flex xl:justify-between xl:mb-2 xl:gap-8">
        <div className="pt-2 md:pt-4 lg:pt-5">
          {/* image  */}
          <div className="w-full h-[400px] my-2 bg-neutral-100 relative xl:w-[500px]">
            <Image
              src={book.bookImgUrl}
              alt={book.title}
              fill
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL="/images/book-placeholder.webp"
            />
          </div>
          {/* badges [featured, quantity, available]*/}
          <SingleBookBadges
            featured={book.featured}
            quantity={currentBookQuantity}
            available={book.available}
          />
        </div>
        {/* info */}
        <div className="">
          <h1 className="pt-2 text-lg font-medium leading-6 md:pt-3 md:text-2xl lg:pt-6 xl:max-w-[750px] xl:py-8">
            {book.title}
          </h1>
          <SingleBookDescription description={book.description} />
        </div>
      </div>
      <div className="mb-3 xl:w-[500px]">
        <SingleBookControlButtons
          bookCurrentQuantity={book.currentQuantity}
          bookAvailable={book.available}
          isAlreadyInCart={isAlreadyInCart}
          isSessionUser={!!session?.user}
          handleOrderBook={handleOrderBook}
        />
      </div>
      <SingleBookInfo book={book} authorId={book.authorId} />
    </div>
  );
};

export default SingleBook;
