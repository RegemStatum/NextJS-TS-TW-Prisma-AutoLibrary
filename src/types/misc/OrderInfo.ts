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

enum OrderStatus {
  ready = "ready",
  received = "received",
  returned = "returned",
  canceled = "canceled",
}

type OrderInfoStatus =
  | OrderStatus.ready
  | OrderStatus.received
  | OrderStatus.returned
  | OrderStatus.canceled;

type OrderInfo = {
  id: string;
  number: number;
  status: OrderInfoStatus;
  Book: OrderInfoBook[];
};

export default OrderInfo;

export type { OrderInfoBook, OrderInfoCabinet, OrderInfoStatus };

export { OrderStatus };
