import React, { FC } from "react";
import { DeleteButton } from "../ui/buttons";
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

  const cancelOrder = () => {
    ordersContext.openOrderModal("cancel", [], orderId, orderNumber);
  };

  return (
    <div
      className={`absolute top-[105px] right-3 p-2 rounded-md bg-neutral-100 shadow-md md:top-[115px] md:right-5 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <DeleteButton onClick={cancelOrder} className="">
        Cancel order
      </DeleteButton>
    </div>
  );
};

export default OrderGridItemOtherControl;
