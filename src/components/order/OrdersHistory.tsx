import OrderInfo from "@/types/misc/OrderInfo";
import React, { FC, useEffect, useState } from "react";
import { Spinner1 } from "../ui/spinners";
import { useAppContext } from "@/context/AppContext";
import { HIDE_AFTER_LONG_MSEC } from "@/utils/constants/misc";
import getUserIdClient from "@/utils/helpers/getUserIdClient";
import { useSession } from "next-auth/react";
import OrdersGrid from "./OrdersGrid";
import { PrimaryButton } from "../ui/buttons";

type Props = {
  hideOrdersHistory: () => void;
};

const OrdersHistory: FC<Props> = ({ hideOrdersHistory }) => {
  const { data: session } = useSession();
  const { showInfoMessage } = useAppContext();
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pullHistoryOrders = async () => {
      try {
        const userId = await getUserIdClient(session);
        const res = await fetch(`/api/orders/${userId}/getHistoryOrders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const orders = data.orders;
        setOrders(orders);
        setIsLoading(false);
      } catch (e: any) {
        console.log(e);
        setIsLoading(false);
        showInfoMessage(
          "error",
          e.message || "Something went wrong. Try again later",
          HIDE_AFTER_LONG_MSEC
        );
      }
    };
    if (!session) return;
    pullHistoryOrders();
  }, [session, showInfoMessage]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner1 className="lg:w-[40px] lg:h-[40px]" />
      </div>
    );
  }

  return (
    <>
      <OrdersGrid orders={orders} />
      {!isLoading && (
        <PrimaryButton
          onClick={hideOrdersHistory}
          className="mt-3 lg:w-[calc(50%_-_4px)]"
        >
          Hide orders history
        </PrimaryButton>
      )}
    </>
  );
};

export default OrdersHistory;
