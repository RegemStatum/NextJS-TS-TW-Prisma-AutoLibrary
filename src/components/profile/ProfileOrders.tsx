import { useProfileContext } from "@/context/ProfileContext";
import React, { FC } from "react";
import OrdersList from "../order/OrdersGrid";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import OrdersNoItems from "../order/OrdersNoItems";
import { Spinner1 } from "../ui/spinners";
import { createPortal } from "react-dom";
import OrderReceptionConfirmationModal from "../order/OrderReceptionConfirmationModal";
import { useOrdersContext } from "@/context/OrdersContext";
import OrderReturnConfirmationModal from "../order/OrderReturnConfirmationModal";
import OrderCancelationConfirmationModal from "../order/OrderCancelationConfirmationModal";
import OrderCabinetsClosedConfirmationModal from "../order/OrderCabinetsClosedConfirmationModal";

const ProfileOrders: FC = ({}) => {
  const profileContext = useProfileContext();
  const ordersContext = useOrdersContext();

  if (!profileContext.orders || profileContext.orders.length === 0) {
    return <OrdersNoItems />;
  }

  if (profileContext.isOrdersLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner1 />
      </div>
    );
  }

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
      {profileContext.badge.type === "error" && (
        <BadgeError className="mb-2">{profileContext.badge.msg}</BadgeError>
      )}
      {profileContext.badge.type === "success" && (
        <BadgeSuccess>{profileContext.badge.msg}</BadgeSuccess>
      )}
      {ordersContext.orderConfirmationModal.isOpen &&
        createPortal(
          orderConfirmationModal,
          document.getElementById("modals")!
        )}
      <h2 className="mb-2 text-xl font-bold lg:mb-3 lg:text-2xl">
        Your orders
      </h2>
      <OrdersList />
    </div>
  );
};

export default ProfileOrders;
