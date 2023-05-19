import { useProfileContext } from "@/context/ProfileContext";
import React, { FC, useState } from "react";
import OrdersGrid from "../order/OrdersGrid";
import OrdersNoItems from "../order/OrdersNoItems";
import { Spinner1 } from "../ui/spinners";
import { createPortal } from "react-dom";
import OrderReceptionConfirmationModal from "../order/OrderReceptionConfirmationModal";
import { useOrdersContext } from "@/context/OrdersContext";
import OrderReturnConfirmationModal from "../order/OrderReturnConfirmationModal";
import OrderCancelationConfirmationModal from "../order/OrderCancelationConfirmationModal";
import OrderCabinetsClosedConfirmationModal from "../order/OrderCabinetsClosedConfirmationModal";
import OrdersHistory from "../order/OrdersHistory";
import { ChevronDownIcon, ChevronUpIcon } from "../ui/icons";

const ProfileOrders: FC = () => {
  const [isShowOrdersHistory, setIsShowOrdersHistory] = useState(false);
  const { orders: activeOrders, isOrdersLoading } = useProfileContext();
  const ordersContext = useOrdersContext();

  if (isOrdersLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner1 />
      </div>
    );
  }

  const hideOrdersHistory = () => {
    setIsShowOrdersHistory(false);
  };

  const toggleIsShowOrdersHistory = () => {
    const newIsShowOrdersHistory = !isShowOrdersHistory;
    setIsShowOrdersHistory(newIsShowOrdersHistory);
  };

  const orderConfirmationModal =
    ordersContext.orderConfirmationModal.modalType === "receive" ? (
      <OrderReceptionConfirmationModal />
    ) : ordersContext.orderConfirmationModal.modalType === "return" ? (
      <OrderReturnConfirmationModal />
    ) : ordersContext.orderConfirmationModal.modalType === "cancel" ? (
      <OrderCancelationConfirmationModal />
    ) : (
      <OrderCabinetsClosedConfirmationModal />
    );

  return (
    <div>
      {ordersContext.orderConfirmationModal.isOpen &&
        createPortal(
          orderConfirmationModal,
          document.getElementById("modals")!
        )}
      {/* active orders */}
      <h2 className="mb-3 text-xl font-medium lg:mb-3 lg:text-2xl">
        Your orders
      </h2>
      {!activeOrders || (activeOrders.length === 0 && <OrdersNoItems />)}
      {activeOrders.length !== 0 && <OrdersGrid orders={activeOrders} />}
      {/* canceled and returned orders */}
      <div
        className="mt-6 mb-2 p-2 w-fit flex gap-3 rounded-md cursor-pointer hover:bg-neutral-100 lg:mt-10 lg:mb-3 "
        onClick={toggleIsShowOrdersHistory}
      >
        <p className="font-medium text-lg lg:text-xl">History of orders</p>
        {isShowOrdersHistory ? (
          <ChevronUpIcon width={22} />
        ) : (
          <ChevronDownIcon width={22} />
        )}
      </div>
      {isShowOrdersHistory && (
        <OrdersHistory hideOrdersHistory={hideOrdersHistory} />
      )}
    </div>
  );
};

export default ProfileOrders;
