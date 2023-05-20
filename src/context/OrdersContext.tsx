import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { useProfileContext } from "./ProfileContext";
import { useSession } from "next-auth/react";
import OrderInfo from "@/types/misc/OrderInfo";
import OrdersContextValue from "@/types/context/OrdersContextValue";
import {
  OrderConfirmationModal,
  OrderConfirmationModalTypes,
  PrevModalTypeToCabinetsClosedConfirmationModal,
} from "@/types/context/OrdersContextValue";
import getUserIdClient from "@/utils/helpers/getUserIdClient";
import { useAppContext } from "./AppContext";
import { HIDE_AFTER_LONG_MILLISECONDS } from "@/utils/constants/misc";
import { InfoMessageType } from "@/types/context/AppContextValue";

const hiddenOrderConfirmationModal: OrderConfirmationModal = {
  modalType: "receive",
  isOpen: false,
  orderId: "",
  orderNumber: -1,
  orderCabinetNumbers: [],
  prevModalTypeToCabinetsClosedConfirmationModal: "receive",
};

const ordersContextInitialValue: OrdersContextValue = {
  receiveOrder: () => {},
  returnOrder: () => {},
  cancelOrder: () => {},
  openCabinets: async () => {},
  closeCabinets: async () => {},
  openOrderModal: (
    type: OrderConfirmationModalTypes,
    orderCabinetNumbers: number[],
    orderId: string,
    orderNumber: number,
    prevModalTypeToCabinetsClosedConfirmationModal?: PrevModalTypeToCabinetsClosedConfirmationModal
  ) => {},
  closeOrderModal: () => {},
  orderConfirmationModal: hiddenOrderConfirmationModal,
};

const OrdersContext = React.createContext(ordersContextInitialValue);

type Props = {
  children: React.ReactNode;
};

const OrdersContextProvider: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const profileContext = useProfileContext();
  const { showInfoMessage } = useAppContext();
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

  const closeOrderModal = useCallback(() => {
    setOrderConfirmationModal(hiddenOrderConfirmationModal);
  }, []);

  const handleError = useCallback(
    (e: any) => {
      console.log(e);
      profileContext.setIsOrdersLoading(false);
      closeOrderModal();
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later",
        HIDE_AFTER_LONG_MILLISECONDS
      );
    },
    [profileContext, closeOrderModal, showInfoMessage]
  );

  const changeCabinetsState = useCallback(
    async (cabinets: number[], type: "open" | "close") => {
      const res = await fetch(`http://192.168.1.149:8082/cabinets/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cabinets,
        }),
      });

      if (res.status === 102) {
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
    },
    []
  );

  const openCabinets = useCallback(
    async (cabinets: number[]) => await changeCabinetsState(cabinets, "open"),
    [changeCabinetsState]
  );

  const closeCabinets = useCallback(
    async (cabinets: number[]) => await changeCabinetsState(cabinets, "close"),
    [changeCabinetsState]
  );

  const openOrderModal = (
    modalType: OrderConfirmationModalTypes,
    orderCabinetNumbers: number[],
    orderId: string,
    orderNumber: number,
    prevModalTypeToCabinetsClosedConfirmationModal?: PrevModalTypeToCabinetsClosedConfirmationModal
  ) => {
    setOrderConfirmationModal({
      modalType,
      isOpen: true,
      orderCabinetNumbers,
      orderId,
      orderNumber,
      prevModalTypeToCabinetsClosedConfirmationModal:
        prevModalTypeToCabinetsClosedConfirmationModal || "receive",
    });
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
    type: InfoMessageType,
    msg: string
  ) => {
    profileContext.setOrders(newUserOrders);
    showInfoMessage(type, msg);
    profileContext.setIsOrdersLoading(false);
  };

  // const getOrderCabinets = (orderId: string): number[] => {
  //   const order = profileContext.orders.find((order) => order.id === orderId);
  //   if (!order) {
  //     throw new Error(`There is no order with id ${orderId}`);
  //   }
  //   const cabinets = order.Book.map((book) => book.cabinet!.number);
  //   if (!cabinets || cabinets.length === 0) {
  //     throw new Error("No cabinets founds for ");
  //   }
  //   return cabinets;
  // };

  // ORDER ACTIONS
  const receiveOrder = async (orderId: string) => {
    try {
      startOrderAction();
      // update order state to received
      const userId = await getUserIdClient(session);
      const res = await fetch(`/api/orders/${userId}/receiveOrder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
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
        "info",
        `Order ${receivedOrderNumber} received`
      );
    } catch (e: any) {
      handleError(e);
    }
  };

  const returnOrder = async (orderId: string) => {
    try {
      startOrderAction();
      // update order state to returned
      const userId = await getUserIdClient(session);
      const res = await fetch(`/api/orders/${userId}/returnOrder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
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
        "info",
        `Order ${returnedOrderNumber} returned`
      );
    } catch (e: any) {
      handleError(e);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      startOrderAction();
      const userId = await getUserIdClient(session);

      // delete order fetch delete, increment quantity to books in order
      const res = await fetch(`/api/orders/${userId}/cancelOrder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
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
      finishOrderAction(newUserOrders, "info", badgeMsg);
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
        openCabinets,
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
