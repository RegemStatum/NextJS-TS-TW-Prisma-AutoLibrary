import { useCartContext } from "@/context/CartContext";
import CartBook from "@/types/misc/CartBook";
import React, { FC, useEffect, useState } from "react";
import Spinner1 from "../ui/spinners/Spinner1";
import { BadgeError } from "../ui/badges";
import CartControlButtons from "./CartControlButtons";
import CartNoBooks from "./CartNoBooks";
import CartGridItem from "./CartGridItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { HIDE_AFTER_DEFAULT_MSEC } from "@/utils/constants/misc";

const CartGrid: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const cartContext = useCartContext();
  const cartBooksIds = cartContext.cartBooksIds;
  const [cartBooks, setCartBooks] = useState<CartBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const navigateHome = async () => {
      await router.push("/");
    };
    if (router.isReady && !session) {
      navigateHome();
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [session, router, router.isReady]);

  useEffect(() => {
    const setNewCartBooksInfo = async () => {
      try {
        if (cartBooksIds.length === 0) {
          setCartBooks([]);
          return;
        }
        setIsLoading(true);
        const fetchUri = `/api/cart/${cartBooksIds.join(",")}`;
        const res = await fetch(`${fetchUri}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { cartBooks: newCartBooks } = await res.json();
        setCartBooks(newCartBooks);
        setIsLoading(false);
      } catch (e: any) {
        console.log(e);
        setErrorMsg(e.message);
        setIsLoading(false);
      }
    };
    setNewCartBooksInfo();
  }, [cartBooksIds]);

  // clear error msg after 5 secs
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, HIDE_AFTER_DEFAULT_MSEC);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleOrder = async () => {
    try {
      setIsLoading(true);
      await cartContext.createOrder();
      await router.push("/profile");
      cartContext.clearCart();
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      setErrorMsg(e.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner1 className="" />
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <p className="text-lg font-bold">Sorry, there is no session</p>
      </div>
    );
  }

  if (cartBooks.length === 0) {
    return <CartNoBooks />;
  }

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {cartBooks.map((cartBook) => (
          <CartGridItem key={cartBook.id} cartBook={cartBook} />
        ))}
      </div>
      <CartControlButtons handleOrder={handleOrder} />
      {errorMsg && <BadgeError className="mt-2">{errorMsg}</BadgeError>}
    </div>
  );
};

export default CartGrid;
