import OrderInfo from "@/types/misc/OrderInfo";
import React, { FC, useState } from "react";
import OrderListItem from "./OrderListItem";

type Props = {
  orders: OrderInfo[];
  cancelOrder: (id: string) => void;
};

const OrdersList: FC<Props> = ({ orders, cancelOrder }) => {
  const [receivedOrderIds, setReceivedOrderIds] = useState<string[]>([]);
  const [completedOrderIds, setCompletedOrderIds] = useState<string[]>([]);

  const changeCabinetsState = async (
    cabinets: number[],
    type: "open" | "close"
  ) => {
    const res = await fetch(`192.168.1.149:8082/cabinets/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cabinets: cabinets,
      }),
    });
    const data = await res.json();

    // check if correct cabinets were opened
    let isCorrectCabinetsChangedState = true;
    for (let i = 0; i <= cabinets.length; i++) {
      if (cabinets[i] !== data.cabinets[i]) {
        isCorrectCabinetsChangedState = false;
        break;
      }
    }
    if (!isCorrectCabinetsChangedState)
      throw new Error(`Wrong cabinets were ${type}ed`);
  };

  const receiveOrder = async (id: string, cabinetsToOpen: number[]) => {
    await changeCabinetsState(cabinetsToOpen, "open");
    const newReceivedOrderIds = [...receivedOrderIds, id];
    setReceivedOrderIds(newReceivedOrderIds);
  };

  const returnOrder = async (id: string, cabinetsToClose: number[]) => {
    await changeCabinetsState(cabinetsToClose, "close");
    const newReceivedOrderIds = receivedOrderIds.filter(
      (orderId) => orderId !== id
    );
    setReceivedOrderIds(newReceivedOrderIds);
  };

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        return (
          <OrderListItem
            key={order.id}
            order={order}
            cancelOrder={cancelOrder}
          />
        );
      })}
    </div>
  );
};

export default OrdersList;
