type OrderInfoBook = {
  id: string;
  title: string;
  author: {
    firstName: string;
    secondName: string;
  };
  cabinet: OrderInfoCabinet;
};

type OrderInfoCabinet = {
  id: string;
  number: number;
  isEmpty: boolean;
} | null;

type OrderInfoStatus = "ready" | "received" | "returned" | "canceled";

type OrderInfo = {
  id: string;
  number: number;
  status: OrderInfoStatus;
  Book: OrderInfoBook[];
};

export default OrderInfo;

export type { OrderInfoBook, OrderInfoCabinet, OrderInfoStatus };
