import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import Link from "next/link";

interface Props {
  bookCurrentQuantity: number;
  bookAvailable: boolean;
  isAlreadyInCart: boolean;
  isSessionUser: boolean;
  handleOrderBook: () => void;
}

const SingleBookControlButtons: FC<Props> = ({
  bookCurrentQuantity,
  bookAvailable,
  isAlreadyInCart,
  isSessionUser,
  handleOrderBook,
}) => {
  return (
    <div className="flex flex-col gap-1 sm:flex-row">
      <PrimaryButton
        onClick={() => handleOrderBook()}
        disabled={
          bookCurrentQuantity <= 0 ||
          !bookAvailable ||
          isAlreadyInCart ||
          !isSessionUser
        }
      >
        {!isSessionUser
          ? "Sign in to access"
          : isAlreadyInCart
          ? "Already in cart"
          : "Add to cart"}
      </PrimaryButton>
      <Link
        href="/books"
        className="w-full sm:w-[calc(50%_-_8px)] block shrink-0"
      >
        <SecondaryButton>Back to all books</SecondaryButton>
      </Link>
    </div>
  );
};

export default SingleBookControlButtons;
