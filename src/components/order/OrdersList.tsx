import OrderInfo from "@/types/OrderInfo";
import React, { FC } from "react";
import OrderListItem from "./OrderListItem";

type Props = {
  orders: OrderInfo[];
  cancelOrder: (id: string) => void;
};

const OrdersList: FC<Props> = ({ orders, cancelOrder }) => {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderListItem key={order.id} order={order} cancelOrder={cancelOrder} />
      ))}
    </div>
  );
};

export default OrdersList;
