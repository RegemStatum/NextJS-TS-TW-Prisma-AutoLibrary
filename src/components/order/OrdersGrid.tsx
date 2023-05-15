import React, { FC } from "react";
import OrderGridItem from "./OrderGridItem";
import { useProfileContext } from "@/context/ProfileContext";

const OrdersGrid: FC = () => {
  const profileContext = useProfileContext();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {profileContext.orders.map((order) => {
        return <OrderGridItem key={order.id} order={order} />;
      })}
    </div>
  );
};

export default OrdersGrid;
