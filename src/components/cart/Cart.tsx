import { useCartContext } from "@/context/CartContext";
import CartBook from "@/types/CartBook";
import React, { FC, useEffect, useState } from "react";
import Spinner1 from "../ui/spinners/Spinner1";
import { BadgeError } from "../ui/badges";
import CartControlButtons from "./CartControlButtons";
import CartNoBooks from "./CartNoBooks";
import CartGridItem from "./CartGridItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    if (router.isReady && !session) {
      router.push("/");
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [session, router, router.isReady]);

  useEffect(() => {
    const setNewCartBooksInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/cart/findBooks`, {
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
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const createOrder = async () => {
    if (!session) {
      throw new Error("No session");
    }

    if (!session.user) {
      throw new Error("No user in session");
    }

    const email = session.user.email;
    if (!email) {
      throw new Error("No user email in session");
    }

    const userIdRes = await fetch(`/api/profile/getIdByEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (!userIdRes.ok) {
      throw new Error("Something went wrong while trying to receive user id");
    }

    const userData = await userIdRes.json();
    const userId = userData.id;

    const res = await fetch(`/api/order/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        booksIds: cartBooksIds,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.msg || "Something went wrong while trying to create order"
      );
    }
  };

  const handleOrder = async () => {
    try {
      setIsLoading(true);
      await createOrder();
      cartContext.clearCart();
      router.push("/profile");
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
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {cartBooks.map((cartBook, index) => (
          <CartGridItem
            key={cartBook.id}
            cartBook={cartBook}
            bookOrderIndex={index + 1}
          />
        ))}
      </div>
      <CartControlButtons
        clearCart={cartContext.clearCart}
        handleOrder={handleOrder}
      />
      {errorMsg && <BadgeError className="mt-2">{errorMsg}</BadgeError>}
    </div>
  );
};

export default CartGrid;
