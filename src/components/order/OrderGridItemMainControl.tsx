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

  const openReceptionConfirmationModal = () => {
    ordersContext.openOrderModal(
      "receive",
      orderCabinetNumbers,
      orderId,
      orderNumber,
      "receive"
    );
  };

  const openReturnConfirmationModal = () => {
    ordersContext.openOrderModal(
      "return",
      orderCabinetNumbers,
      orderId,
      orderNumber,
      "return"
    );
  };

  return (
    <div>
      {status === OrderStatus.ready && (
        <PrimaryButton onClick={openReceptionConfirmationModal}>
          Receive order
        </PrimaryButton>
      )}
      {status === OrderStatus.received && (
        <SecondaryButton onClick={openReturnConfirmationModal}>
          Return order
        </SecondaryButton>
      )}
    </div>
  );
};

export default OrderGridItemMainControl;
