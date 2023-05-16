type OrderConfirmationModalTypes =
  | "receive"
  | "return"
  | "cancel"
  | "cabinetsToClose";

type PrevModalTypeToCabinetsClosedConfirmationModal = "receive" | "return";

type OrderConfirmationModal = {
  modalType: OrderConfirmationModalTypes;
  isOpen: boolean;
  orderId: string;
  orderNumber: number;
  orderCabinetNumbers: number[];
  prevModalTypeToCabinetsClosedConfirmationModal: PrevModalTypeToCabinetsClosedConfirmationModal;
};

type OrdersContextValue = {
  receiveOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  openCabinets: (cabinets: number[]) => Promise<void>;
  closeCabinets: (cabinets: number[]) => Promise<void>;
  openOrderModal: (
    type: OrderConfirmationModalTypes,
    orderCabinetNumbers: number[],
    orderId: string,
    orderNumber: number,
    prevModalTypeToCabinetsClosedConfirmationModal?: PrevModalTypeToCabinetsClosedConfirmationModal
  ) => void;
  closeOrderModal: () => void;
  orderConfirmationModal: OrderConfirmationModal;
};

export default OrdersContextValue;

export type {
  OrderConfirmationModalTypes,
  OrderConfirmationModal,
  PrevModalTypeToCabinetsClosedConfirmationModal,
};
