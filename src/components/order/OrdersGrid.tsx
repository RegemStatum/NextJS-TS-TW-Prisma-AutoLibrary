import React, { FC } from "react";
import OrderGridItem from "./OrderGridItem";
import OrderInfo from "@/types/misc/OrderInfo";

type Props = {
  orders: OrderInfo[];
};

const OrdersGrid: FC<Props> = ({ orders }) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {orders.map((order) => {
        return <OrderGridItem key={order.id} order={order} />;
      })}
    </div>
  );
};

export default OrdersGrid;
