import { useProfileContext } from "@/context/ProfileContext";
import React, { FC } from "react";
import OrdersList from "../order/OrdersList";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import OrdersNoItems from "../order/OrdersNoItems";
import { Spinner1 } from "../ui/spinners";

const ProfileOrders: FC = ({}) => {
  const profileContext = useProfileContext();

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

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold lg:mb-2 lg:text-2xl">
        Your orders
      </h2>
      <OrdersList />
      {profileContext.badge.type === "error" && (
        <BadgeError className="mb-2">{profileContext.badge.msg}</BadgeError>
      )}
      {profileContext.badge.type === "success" && (
        <BadgeSuccess>{profileContext.badge.msg}</BadgeSuccess>
      )}
    </div>
  );
};

export default ProfileOrders;
