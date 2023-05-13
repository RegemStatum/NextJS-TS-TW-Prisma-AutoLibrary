import { useProfileContext } from "@/context/ProfileContext";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import OrdersList from "../order/OrdersList";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import OrdersNoItems from "../order/OrdersNoItems";
import { Spinner1 } from "../ui/spinners";

const ProfileOrders: FC = ({}) => {
  const { data: session } = useSession();
  const profileContext = useProfileContext();

  const cancelOrder = async (orderId: string) => {
    try {
      profileContext.setIsOrdersLoading(true);
      if (!session) {
        throw new Error("No session");
      }

      if (!session.user) {
        throw new Error("No user in session");
      }

      const email = session.user.email;
      if (!email) {
        throw new Error("No user email in session");
      }

      const userIdRes = await fetch(`/api/profile/getIdByEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!userIdRes.ok) {
        throw new Error("Something went wrong while trying to receive user id");
      }

      const userData = await userIdRes.json();
      const userId = userData.id;
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
      profileContext.setOrders(newUserOrders);
      profileContext.setBadge({
        type: "success",
        msg: `Order with number: ${canceledOrderNumber} successfully canceled`,
      });
      profileContext.setIsOrdersLoading(false);
    } catch (e: any) {
      console.log(e);
      profileContext.setBadge({ type: "error", msg: e.message });
      profileContext.setIsOrdersLoading(false);
    }
  };

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
      <OrdersList orders={profileContext.orders} cancelOrder={cancelOrder} />
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
