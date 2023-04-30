import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

type CartContextValueT = {
  cartBooksIds: string[];
  addBookToCart: (id: string) => void;
  removeBookFromCart: (id: string) => void;
  clearCart: () => void;
};

const contextDefaultValue: CartContextValueT = {
  cartBooksIds: [],
  addBookToCart: () => {},
  removeBookFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext(contextDefaultValue);

const CartContextProvider: FC<Props> = ({ children }) => {
  const [cartBooksIds, setCartBooksIds] = useState<string[]>([]);
  const MAX_BOOKS_IN_ORDER = 3;

  const addBookToCart = (id: string) => {
    if (cartBooksIds.length >= MAX_BOOKS_IN_ORDER) {
      throw new Error("Your order can contain up to 3 books");
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
