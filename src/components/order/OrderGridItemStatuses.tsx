import React, { FC } from "react";
import OrderGridItemStatus from "./OrderGridItemStatus";
import { OrderInfoStatus, OrderStatus } from "@/types/misc/OrderInfo";

interface Props {
  status: OrderInfoStatus;
}

const OrderGridItemStatuses: FC<Props> = ({ status }) => {
  return status === OrderStatus.ready ? (
    <OrderGridItemStatus
      status={status}
      textClassName="text-green-600"
      indicatorClassName="bg-green-700"
    />
  ) : status === OrderStatus.received ? (
    <OrderGridItemStatus
      status={status}
      textClassName="text-yellow-600"
      indicatorClassName="bg-yellow-700"
    />
  ) : status === OrderStatus.returned ? (
    <OrderGridItemStatus
      status={status}
      textClassName="text-sky-600"
      indicatorClassName="bg-sky-700"
    />
  ) : (
    <OrderGridItemStatus
      status={status}
      textClassName="text-red-600"
      indicatorClassName="bg-red-700"
    />
  );
};

export default OrderGridItemStatuses;
