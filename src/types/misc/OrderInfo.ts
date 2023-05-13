export type OrderInfoBook = {
  id: string;
  title: string;
  author: {
    firstName: string;
    secondName: string;
  };
  cabinet: OrderInfoCabinet;
};

export type OrderInfoCabinet = {
  id: string;
  number: number;
  isEmpty: boolean;
} | null;

type OrderInfo = {
  id: string;
  number: number;
  status: string;
  Book: OrderInfoBook[];
};

export default OrderInfo;
