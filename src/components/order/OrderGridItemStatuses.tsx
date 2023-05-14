import React, { FC } from "react";
import OrderGridItemStatus from "./OrderGridItemStatus";

// Warning modify status
interface Props {
  status: string;
}

const OrderGridItemStatuses: FC<Props> = ({ status }) => {
  return status === "ready" ? (
    <OrderGridItemStatus
      status={status}
      className="bg-green-300 text-green-900"
    />
  ) : status === "received" ? (
    <OrderGridItemStatus
      status={status}
      className="bg-yellow-300 text-yellow-900"
    />
  ) : status === "returned" ? (
    <OrderGridItemStatus status={status} className="bg-sky-300 text-sky-900" />
  ) : (
    <OrderGridItemStatus status={status} className="bg-red-300 text-red-900" />
  );
};

export default OrderGridItemStatuses;
