type OrderConfirmationModalTypes = "receive" | "return" | "cancel";

type OrderConfirmationModal = {
  modalType: OrderConfirmationModalTypes;
  isOpen: boolean;
  orderId: string;
  orderNumber: number;
  orderCabinetNumbers: number[];
};

type OrdersContextValue = {
  receiveOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  closeCabinets: (cabinets: number[]) => void;
  openOrderModal: (
    type: OrderConfirmationModalTypes,
    orderCabinetNumbers: number[],
    orderId: string,
    orderNumber: number
  ) => void;
  closeOrderModal: () => void;
  orderConfirmationModal: OrderConfirmationModal;
};

export default OrdersContextValue;

export type { OrderConfirmationModalTypes, OrderConfirmationModal };
