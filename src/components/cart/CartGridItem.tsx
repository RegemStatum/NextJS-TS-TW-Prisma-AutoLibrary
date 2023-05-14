import CartBook from "@/types/misc/CartBook";
import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { useCartContext } from "@/context/CartContext";

interface Props {
  cartBook: CartBook;
  bookOrderIndex: number;
}

const CartGridItem: FC<Props> = ({ cartBook, bookOrderIndex }) => {
  const cartContext = useCartContext();

  return (
    <div className="rounded-md shadow-md border border-neutral-200">
      {/* image */}
      <div className="w-full min-h-[300px] rounded-md overflow-hidden relative shrink-0 bg-neutral-100">
        <Image
          src={cartBook.bookImgUrl}
          alt={cartBook.title}
          style={{ objectFit: "contain" }}
          fill
          placeholder="blur"
          blurDataURL={cartBook.bookImgUrl}
        />
      </div>
      <div className="p-4 pb-5">
        {/* book info */}
        <div className="mb-3 md:mb-5">
          <h2 className="mb-1 text-lg font-medium leading-snug lg:min-h-[60px] md:text-xl">
            {cartBook.title}
          </h2>
          <p className="text-lg">
            {cartBook.author.firstName} {cartBook.author.secondName}
          </p>
        </div>
        {/* book control */}
        <div className="flex gap-4">
          <span className="font-bold">#{bookOrderIndex}</span>
          <Link
            href={`/books/${cartBook.id}`}
            className="text-blue-500 underline"
          >
            Go to book page
          </Link>
          <p
            className="text-red-500 underline cursor-pointer"
            onClick={() => cartContext.removeBookFromCart(cartBook.id)}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartGridItem;
