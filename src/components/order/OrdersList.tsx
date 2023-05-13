import React, { FC } from "react";
import OrderListItem from "./OrderListItem";
import { useSession } from "next-auth/react";
import { useProfileContext } from "@/context/ProfileContext";
import OrderInfo from "@/types/misc/OrderInfo";

const OrdersList: FC = () => {
  const { data: session } = useSession();
  const profileContext = useProfileContext();

  const handleError = (e: any) => {
    console.log(e);
    profileContext.setBadge({ type: "error", msg: e.message });
    profileContext.setIsOrdersLoading(false);
  };

  const checkSession = () => {
    if (!session) {
      throw new Error("No session");
    }

    if (!session.user) {
      throw new Error("No user in session");
    }

    if (!session.user.email) {
      throw new Error("No user email in session");
    }
  };

  const startOrderAction = () => {
    profileContext.setIsOrdersLoading(true);
    checkSession();
  };

  // Warning - handle badgeType correctly
  const finishOrderAction = (
    newUserOrders: OrderInfo[],
    badgeType: "success" | "error" | "info" | "pending" | "",
    badgeMsg: string
  ) => {
    profileContext.setOrders(newUserOrders);
    profileContext.setBadge({
      type: badgeType,
      msg: badgeMsg,
    });
    profileContext.setIsOrdersLoading(false);
  };

  const getOrderCabinets = (orderId: string): number[] => {
    const order = profileContext.orders.find((order) => order.id === orderId);
    if (!order) {
      throw new Error(`There is no order with id ${orderId}`);
    }
    const cabinets = order.Book.map((book) => book.cabinet!.number);
    if (!cabinets || cabinets.length === 0) {
      throw new Error("No cabinets founds for ");
    }
    return cabinets;
  };

  const getUserIdByEmail = async (): Promise<string> => {
    const userIdRes = await fetch(`/api/profile/getIdByEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: session!.user!.email }),
    });

    if (!userIdRes.ok) {
      throw new Error("Something went wrong while trying to receive user id");
    }

    const userData = await userIdRes.json();
    const userId = userData.id;
    return userId;
  };

  const changeCabinetsState = async (
    cabinets: number[],
    type: "open" | "close"
  ) => {
    const res = await fetch(`http://192.168.1.149:8082/cabinets/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cabinets,
      }),
    });
    if (res.status === 404) {
      throw new Error(
        "Cabinets control server is currently unavailable. Try again later"
      );
    }
    if (!res.ok) {
      throw new Error(
        "Something went wrong while accessing cabinets control server. Try again later"
      );
    }

    const data = await res.json();

    for (let i = 0; i < data.cabinets.length; i++) {
      if (data.cabinets[i] !== cabinets[i]) {
        throw new Error(`Wrong cabinets were ${type}ed`);
      }
    }
  };

  // ORDER ACTIONS
  const receiveOrder = async (orderId: string) => {
    try {
      startOrderAction();
      const cabinets = getOrderCabinets(orderId);
      await changeCabinetsState(cabinets, "open");

      // update order state to received
      const userId = await getUserIdByEmail();
      const res = await fetch("/api/order/receiveOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          userId,
        }),
      });

      if (!res.ok) {
        throw new Error(
          "Something went wrong. Order was not returned. Try again later"
        );
      }

      const data = await res.json();
      const newUserOrders = data.userOrders;
      const receivedOrderNumber = data.receivedOrder.number;
      finishOrderAction(
        newUserOrders,
        "success",
        `Order ${receivedOrderNumber} received`
      );
    } catch (e: any) {
      handleError(e);
    }
  };

  const returnOrder = async (orderId: string) => {
    try {
      startOrderAction();
      const cabinets = getOrderCabinets(orderId);
      await changeCabinetsState(cabinets, "close");

      // update order state to returned
      const userId = await getUserIdByEmail();
      const res = await fetch("/api/order/returnOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          userId,
        }),
      });

      if (!res.ok) {
        throw new Error(
          "Something went wrong. Order was not returned. Try again later"
        );
      }

      const data = await res.json();
      const newUserOrders = data.userOrders;
      const returnedOrderNumber = data.returnedOrder.number;
      finishOrderAction(
        newUserOrders,
        "success",
        `Order ${returnedOrderNumber} returned`
      );
    } catch (e: any) {
      handleError(e);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      startOrderAction();
      const userId = await getUserIdByEmail();

      // delete order fetch delete, increment quantity to books in order
      const res = await fetch(`/api/order/cancelOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          userId,
        }),
      });

      if (!res.ok) {
        throw new Error(
          "Something went wrong. Order was not deleted. Try again later"
        );
      }

      const data = await res.json();
      const newUserOrders = data.userOrders;
      const canceledOrderNumber = data.canceledOrder.number;
      const badgeMsg = `Order with number: ${canceledOrderNumber} successfully canceled`;
      finishOrderAction(newUserOrders, "success", badgeMsg);
    } catch (e: any) {
      handleError(e);
    }
  };

  return (
    <div className="space-y-3">
      {profileContext.orders.map((order) => {
        return (
          <OrderListItem
            key={order.id}
            order={order}
            cancelOrder={cancelOrder}
            receiveOrder={receiveOrder}
            returnOrder={returnOrder}
          />
        );
      })}
    </div>
  );
};

export default OrdersList;
