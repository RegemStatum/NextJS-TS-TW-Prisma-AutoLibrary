import React, { FC } from "react";
import { EllipsisVerticalIcon } from "../ui/icons";
import { OrderStatus } from "@/types/misc/OrderInfo";

interface Props {
  orderStatus: OrderStatus;
  orderNumber: number;
  toggleShowOtherControl: () => void;
}

const OrderGridItemHeader: FC<Props> = ({
  orderStatus,
  orderNumber,
  toggleShowOtherControl,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-medium">
        Order number:
        <span className="inline-block ml-2 text-4xl font-bold text-blue-600 md:ml-3">
          {orderNumber}
        </span>
      </h3>
      {orderStatus === OrderStatus.ready && (
        <div
          onClick={toggleShowOtherControl}
          className="p-1 rounded-md cursor-pointer hover:bg-neutral-100 hover:text-blue-500"
        >
          <EllipsisVerticalIcon width={30} className="select-none" />
        </div>
      )}
    </div>
  );
};

export default OrderGridItemHeader;
