type CartBook = {
  id: string;
  bookImgUrl: string;
  title: string;
  author: {
    firstName: string;
    secondName: string;
  };
};

export default CartBook;
