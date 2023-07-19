import React, { FC } from "react";
import { useOrdersContext } from "@/context/OrdersContext";

interface Props {
  isOpen: boolean;
  orderId: string;
  orderNumber: number;
}

const OrderGridItemOtherControl: FC<Props> = ({
  isOpen,
  orderId,
  orderNumber,
}) => {
  const ordersContext = useOrdersContext();

  const openConfirmationModal = () => {
    ordersContext.openOrderModal("cancel", [], orderId, orderNumber);
  };

  return (
    <div
      className={`absolute top-[56px] right-3 py-1 rounded-md shadow-sm border bg-neutral-50 border-slate-200 md:top-[70px] md:right-5 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <p
        onClick={openConfirmationModal}
        className="px-2 py-2 text-red-600 font-semibold cursor-pointer hover:bg-neutral-100"
      >
        Cancel order
      </p>
    </div>
  );
};

export default OrderGridItemOtherControl;
