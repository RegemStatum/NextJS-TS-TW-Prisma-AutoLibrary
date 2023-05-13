import OrderInfo from "@/types/misc/OrderInfo";
import React, { FC } from "react";
import OrderListItemBooksList from "./OrderListItemBooksGrid";
import { DeleteButton, PrimaryButton, SecondaryButton } from "../ui/buttons";

interface Props {
  order: OrderInfo;
  cancelOrder: (id: string) => void;
  receiveOrder: (id: string) => void;
  returnOrder: (id: string) => void;
}

const OrderListItem: FC<Props> = ({
  order,
  cancelOrder,
  receiveOrder,
  returnOrder,
}) => {
  return (
    <div className="p-3 space-y-3 rounded-md outline outline-1 outline-neutral-300 shadow-md lg:p-5">
      <h3 className="text-xl font-medium">
        Order number:
        <span className="inline-block ml-2 text-4xl font-bold text-blue-600">
          {order.number}
        </span>
      </h3>
      <h2>{order.status}</h2>
      <div>
        <h3 className="mb-1 text-xl font-medium ">Ordered books: </h3>
        <OrderListItemBooksList books={order.Book} />
      </div>
      <div className="w-full flex flex-col gap-1 lg:w-[calc(50%_-_4px)] lg:flex-row lg:justify-between xl:w-[calc(33.33%_-_4px)]">
        <PrimaryButton onClick={async () => await receiveOrder(order.id)}>
          Receive order
        </PrimaryButton>
        <SecondaryButton onClick={async () => await returnOrder(order.id)}>
          Return order
        </SecondaryButton>
        <DeleteButton onClick={async () => await cancelOrder(order.id)}>
          Cancel order
        </DeleteButton>
      </div>
    </div>
  );
};

export default OrderListItem;
