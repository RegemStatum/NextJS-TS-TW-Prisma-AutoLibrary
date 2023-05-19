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
      className={`absolute top-[105px] right-3 p-2 rounded-md bg-neutral-100 shadow-sm border border-slate-200 md:top-[115px] md:right-5 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <p
        onClick={openConfirmationModal}
        className="p-1 text-red-600 font-semibold cursor-pointer"
      >
        Cancel order
      </p>
    </div>
  );
};

export default OrderGridItemOtherControl;
