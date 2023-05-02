type OrderInfo = {
  id: string;
  number: number;
  Book: {
    id: string;
    title: string;
    author: {
      firstName: string;
      secondName: string;
    };
  }[];
  Cabinet: {
    id: string;
    number: number;
    isEmpty: boolean;
  }[];
};

export default OrderInfo;
