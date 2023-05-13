import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { MAX_BOOKS_IN_ORDER } from "@/utils/constants/misc";
import { CartContextValue } from "@/types/context";

type Props = {
  children: React.ReactNode;
};

const contextDefaultValue: CartContextValue = {
  cartBooksIds: [],
  addBookToCart: () => {},
  removeBookFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext(contextDefaultValue);

const CartContextProvider: FC<Props> = ({ children }) => {
  const [cartBooksIds, setCartBooksIds] = useState<string[]>([]);

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

  // get local storage cart books ids if there any
  useEffect(() => {
    const storageCartBooksIds = localStorage.getItem("cartBooksIds");
    if (storageCartBooksIds === "" || storageCartBooksIds === null) {
      return;
    }
    setCartBooksIds(JSON.parse(storageCartBooksIds));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartBooksIds: cartBooksIds,
        addBookToCart,
        removeBookFromCart,
        clearCart,
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
