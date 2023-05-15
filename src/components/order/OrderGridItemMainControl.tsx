import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { useOrdersContext } from "@/context/OrdersContext";
import { OrderInfoStatus, OrderStatus } from "@/types/misc/OrderInfo";

interface Props {
  status: OrderInfoStatus;
  orderId: string;
  orderNumber: number;
  orderCabinetNumbers: number[];
}

const OrderGridItemMainControl: FC<Props> = ({
  status,
  orderId,
  orderNumber,
  orderCabinetNumbers,
}) => {
  const ordersContext = useOrdersContext();

  const receiveOrder = () => {
    ordersContext.receiveOrder(orderId);
    ordersContext.openOrderModal(
      "receive",
      orderCabinetNumbers,
      orderId,
      orderNumber
    );
  };

  const returnOrder = () => {
    ordersContext.returnOrder(orderId);
    ordersContext.openOrderModal(
      "return",
      orderCabinetNumbers,
      orderId,
      orderNumber
    );
  };

  return (
    <div>
      {status === OrderStatus.ready && (
        <PrimaryButton onClick={receiveOrder}>Receive order</PrimaryButton>
      )}
      {status === OrderStatus.received && (
        <SecondaryButton onClick={returnOrder}>Return order</SecondaryButton>
      )}
    </div>
  );
};

export default OrderGridItemMainControl;
