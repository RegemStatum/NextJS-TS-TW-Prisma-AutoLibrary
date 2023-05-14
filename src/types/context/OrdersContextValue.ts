type OrdersContextValue = {
  receiveOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
};

export default OrdersContextValue;
