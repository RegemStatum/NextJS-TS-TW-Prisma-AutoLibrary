import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { MAX_BOOKS_IN_ORDER } from "@/utils/constants/misc";
import { CartContextValue } from "@/types/context";
import { useSession } from "next-auth/react";
import getUserIdClient from "@/utils/helpers/getUserIdClient";

type Props = {
  children: React.ReactNode;
};

const contextDefaultValue: CartContextValue = {
  cartBooksIds: [],
  addBookToCart: () => {},
  removeBookFromCart: () => {},
  clearCart: () => {},
  createOrder: async () => {},
};

const CartContext = createContext(contextDefaultValue);

const CartContextProvider: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const [cartBooksIds, setCartBooksIds] = useState<string[]>([]);

  // get local storage cart books ids if there any
  useEffect(() => {
    const storageCartBooksIds = localStorage.getItem("cartBooksIds");
    if (storageCartBooksIds === "" || storageCartBooksIds === null) {
      return;
    }
    setCartBooksIds(JSON.parse(storageCartBooksIds));
  }, []);

  const addBookToCart = (id: string) => {
    if (cartBooksIds.length >= MAX_BOOKS_IN_ORDER) {
      throw new Error(
        `Your order can contain up to ${MAX_BOOKS_IN_ORDER} books`
      );
    }
    const newCartBooksIds = [...cartBooksIds, id];
    localStorage.setItem("cartBooksIds", JSON.stringify(newCartBooksIds));
    setCartBooksIds(newCartBooksIds);
  };

  const removeBookFromCart = (id: string) => {
    const newCartBooksIds = cartBooksIds.filter((bookId) => bookId !== id);
    localStorage.setItem("cartBooksIds", JSON.stringify(newCartBooksIds));
    setCartBooksIds(newCartBooksIds);
  };

  const clearCart = () => {
    localStorage.setItem("cartBooksIds", "");
    setCartBooksIds([]);
  };

  const createOrder = async () => {
    const userId = await getUserIdClient(session);

    const res = await fetch(`/api/orders/${userId}/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

  return (
    <CartContext.Provider
      value={{
        cartBooksIds: cartBooksIds,
        addBookToCart,
        removeBookFromCart,
        clearCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export default CartContextProvider;
