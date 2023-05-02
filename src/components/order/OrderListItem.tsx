import OrderInfo from "@/types/OrderInfo";
import React, { FC } from "react";

interface Props {
  order: OrderInfo;
}

const OrderListItem: FC<Props> = ({ order }) => {
  return <div>{order.id}</div>;
};

export default OrderListItem;
