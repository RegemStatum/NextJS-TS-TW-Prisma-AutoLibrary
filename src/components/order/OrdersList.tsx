import OrderInfo from "@/types/OrderInfo";
import React, { FC } from "react";
import OrderListItem from "./OrderListItem";

type Props = {
  orders: OrderInfo[];
};

const OrdersList: FC<Props> = ({ orders }) => {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
