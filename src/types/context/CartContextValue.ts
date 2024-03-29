type CartContextValue = {
  cartBooksIds: string[];
  addBookToCart: (id: string) => void;
  removeBookFromCart: (id: string) => void;
  clearCart: () => void;
  createOrder: () => Promise<void>;
};

export default CartContextValue;
