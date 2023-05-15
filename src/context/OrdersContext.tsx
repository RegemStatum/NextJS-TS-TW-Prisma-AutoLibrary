import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { useProfileContext } from "./ProfileContext";
import { useSession } from "next-auth/react";
import OrderInfo from "@/types/misc/OrderInfo";
import { OrdersContextValue } from "@/types/context";
import BadgeType from "@/types/misc/BadgeType";
import {
  OrderConfirmationModal,
  OrderConfirmationModalTypes,
} from "@/types/context/OrdersContextValue";
import { useRouter } from "next/router";

const hiddenOrderConfirmationModal: OrderConfirmationModal = {
  modalType: "receive",
  isOpen: false,
  orderId: "",
  orderNumber: -1,
  orderCabinetNumbers: [],
};

const ordersContextInitialValue: OrdersContextValue = {
  receiveOrder: (orderId) => {},
  returnOrder: (orderId) => {},
  cancelOrder: (orderId) => {},
  closeCabinets: (cabinets) => {},
  openOrderModal: (
    type: OrderConfirmationModalTypes,
    orderCabinetNumbers: number[],
    orderId: string,
    orderNumber: number
  ) => {},
  closeOrderModal: () => {},
  orderConfirmationModal: hiddenOrderConfirmationModal,
};

const OrdersContext = React.createContext(ordersContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const OrdersContextProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const profileContext = useProfileContext();
  const [orderConfirmationModal, setOrderConfirmationModal] =
    useState<OrderConfirmationModal>(hiddenOrderConfirmationModal);

  // disable page scroll when modal is open
  useEffect(() => {
    const bodyHTMLElement = document.getElementById("body");
    if (orderConfirmationModal.isOpen === true) {
      bodyHTMLElement?.classList.add("overflow-hidden");
    }
    return () => bodyHTMLElement?.classList.remove("overflow-hidden");
  }, [orderConfirmationModal]);

  const closeCabinets = useCallback(
    (cabinets: number[]) => changeCabinetsState(cabinets, "close"),
    []
  );

  useEffect(() => {
    const handlePageChange = () => {
      if (orderConfirmationModal.orderCabinetNumbers.length !== 0) {
        closeCabinets(orderConfirmationModal.orderCabinetNumbers);
      }
    };
    router.events.on("routeChangeStart", handlePageChange);
    return () => {
      router.events.off("routeChangeStart", handlePageChange);
      handlePageChange();
    };
  }, [
    router.events,
    closeCabinets,
    orderConfirmationModal.isOpen,
    orderConfirmationModal.orderCabinetNumbers,
  ]);

  const openOrderModal = (
    modalType: OrderConfirmationModalTypes,
    orderCabinetNumbers: number[],
    orderId: string,
    orderNumber: number
  ) => {
    setOrderConfirmationModal({
      modalType,
      isOpen: true,
      orderCabinetNumbers,
      orderId,
      orderNumber,
    });
  };

  const closeOrderModal = () => {
    setOrderConfirmationModal(hiddenOrderConfirmationModal);
  };

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

  const finishOrderAction = (
    newUserOrders: OrderInfo[],
    badgeType: BadgeType,
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
      await changeCabinetsState(cabinets, "open");

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
    <OrdersContext.Provider
      value={{
        receiveOrder,
        returnOrder,
        cancelOrder,
        closeCabinets,
        openOrderModal,
        closeOrderModal,
        orderConfirmationModal,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContextProvider;

export const useOrdersContext = () => useContext(OrdersContext);
