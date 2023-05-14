import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { useOrdersContext } from "@/context/OrdersContext";
import { OrderInfoStatus } from "@/types/misc/OrderInfo";

interface Props {
  status: OrderInfoStatus;
  orderId: string;
}

const OrderGridItemMainControl: FC<Props> = ({ status, orderId }) => {
  const ordersContext = useOrdersContext();

  return (
    <div>
      {status === "ready" && (
        <PrimaryButton onClick={() => ordersContext.receiveOrder(orderId)}>
          Receive order
        </PrimaryButton>
      )}
      {status === "received" && (
        <SecondaryButton onClick={() => ordersContext.returnOrder(orderId)}>
          Return order
        </SecondaryButton>
      )}
    </div>
  );
};

export default OrderGridItemMainControl;
