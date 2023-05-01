import { useCartContext } from "@/context/CartContext";
import CartBook from "@/types/CartBook";
import React, { FC, useEffect, useState } from "react";
import Spinner1 from "../ui/spinners/Spinner1";
import CartGridItem from "./CartGridItem";
import { BadgeError } from "../ui/badges";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import Link from "next/link";

const CartGrid: FC = () => {
  const cartContext = useCartContext();
  const cartBooksIds = cartContext.cartBooksIds;
  const [cartBooks, setCartBooks] = useState<CartBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const setNewCartBooksInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/cart/getBooks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartBooksIds,
          }),
        });
        const { cartBooks: newCartBooks } = await res.json();
        setCartBooks(newCartBooks);
        setIsLoading(false);
      } catch (e: any) {
        console.log(e.message);
        setErrorMsg(e.message);
        setIsLoading(false);
      }
    };
    setNewCartBooksInfo();
  }, [cartBooksIds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner1 className="" />
      </div>
    );
  }

  if (cartBooks.length === 0) {
    return (
      <div className="pt-4">
        <h2 className="text-xl font-medium lg:text-3xl">
          There are no books yet
        </h2>
        <p className="pt-1 text-normal lg:pt-2 lg:text-xl">
          Add books to your cart
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {cartBooks.map((cartBook, index) => (
          <CartGridItem
            key={cartBook.id}
            cartBook={cartBook}
            bookOrderIndex={index + 1}
          />
        ))}
      </div>
      <div className="mt-5 space-y-2 lg:w-[calc(50%_-_8px)] xl:w-[calc(33.33%_-_8px)]">
        <SecondaryButton onClick={() => cartContext.clearCart()}>
          Remove all books
        </SecondaryButton>
        <Link href="/order" className="block">
          <PrimaryButton>Order</PrimaryButton>
        </Link>
      </div>
      {errorMsg && <BadgeError>{errorMsg}</BadgeError>}
    </div>
  );
};

export default CartGrid;
