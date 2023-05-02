import { signOut, useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { SecondaryButton } from "../ui/buttons";
import { useCartContext } from "@/context/CartContext";
import OrderInfo from "@/types/OrderInfo";
import OrdersNoItems from "../order/OrdersNoItems";
import OrdersList from "../order/OrdersList";
import { BadgeError, BadgeSuccess } from "../ui/badges";
import { Spinner1 } from "../ui/spinners";

type Props = {
  orders?: OrderInfo[];
};

type InfoBadge = {
  type: "success" | "error" | "info" | "pending" | "";
  msg: string;
};

const hiddenInfoBadge: InfoBadge = {
  type: "",
  msg: "",
};

const Profile: FC<Props> = ({ orders: extOrders }) => {
  const { data: session } = useSession();
  const cartContext = useCartContext();
  const [orders, setOrders] = useState(extOrders);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [infoBadge, setInfoBadge] = useState<InfoBadge>(hiddenInfoBadge);

  useEffect(() => {
    if (infoBadge.msg === "") return;
    const timer = setTimeout(() => {
      setInfoBadge(hiddenInfoBadge);
    }, 5000);
    return () => clearTimeout(timer);
  }, [infoBadge]);

  const handleSignOutButtonClick = async () => {
    try {
      await signOut();
      cartContext.clearCart();
    } catch (e) {
      console.log(e);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      setIsOrdersLoading(true);
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
      setOrders(newUserOrders);
      setInfoBadge({
        type: "success",
        msg: `Order with number: ${canceledOrderNumber} successfully canceled`,
      });
      setIsOrdersLoading(false);
    } catch (e: any) {
      console.log(e);
      setInfoBadge({ type: "error", msg: e.message });
      setIsOrdersLoading(false);
    }
  };

  let ordersSection: React.ReactNode;

  if (orders) {
    ordersSection = (
      <div>
        <h2 className="mb-2 text-xl font-bold lg:mb-2 lg:text-2xl">
          Your orders
        </h2>
        <OrdersList orders={orders} cancelOrder={cancelOrder} />
        {infoBadge.type === "error" && (
          <BadgeError className="mb-2">{infoBadge.msg}</BadgeError>
        )}
        {infoBadge.type === "success" && (
          <BadgeSuccess>{infoBadge.msg}</BadgeSuccess>
        )}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    ordersSection = <OrdersNoItems />;
  }

  if (isOrdersLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner1 />
      </div>
    );
  }

  return (
    <div className="pt-4 space-y-10">
      {/* profile info */}
      <div>
        <h2 className="mb-1 text-xl font-bold lg:mb-2 lg:text-2xl">Profile</h2>
        <p className="text-lg lg:text-xl">
          Hello, {session?.user?.name || session?.user?.email}
        </p>
        <SecondaryButton
          className="w-full max-w-[250px] mt-2"
          onClick={() => handleSignOutButtonClick()}
        >
          Sign out
        </SecondaryButton>
      </div>
      {/* orders */}
      {ordersSection}
    </div>
  );
};

export default Profile;
