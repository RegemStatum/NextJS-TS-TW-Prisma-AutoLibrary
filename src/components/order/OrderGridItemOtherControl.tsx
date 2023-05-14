import React, { FC } from "react";
import { DeleteButton } from "../ui/buttons";
import { useOrdersContext } from "@/context/OrdersContext";

interface Props {
  isOpen: boolean;
  orderId: string;
}

const OrderGridItemOtherControl: FC<Props> = ({ isOpen, orderId }) => {
  const ordersContext = useOrdersContext();

  return (
    <div
      className={`absolute top-[105px] right-3 p-2 rounded-md bg-neutral-100 shadow-md md:top-[115px] md:right-5 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <DeleteButton
        onClick={() => ordersContext.cancelOrder(orderId)}
        className=""
      >
        Cancel order
      </DeleteButton>
    </div>
  );
};

export default OrderGridItemOtherControl;
