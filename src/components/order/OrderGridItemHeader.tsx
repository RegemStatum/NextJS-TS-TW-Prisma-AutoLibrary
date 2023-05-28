import React, { FC } from "react";
import { EllipsisVerticalIcon } from "../ui/icons";
import { OrderStatus } from "@/types/misc/OrderInfo";
import OrderGridItemStatuses from "./OrderGridItemStatuses";

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
    <div className="flex items-start justify-between">
      <div className="flex flex-col md:flex-row md:gap-6">
        <h3 className="text-xl font-medium">
          Order number:
          <span className="inline-block ml-2 text-4xl font-medium md:ml-3">
            {orderNumber}
          </span>
        </h3>
        <div className="flex justify-start items-end">
          <OrderGridItemStatuses status={orderStatus} />
        </div>
      </div>
      {orderStatus === OrderStatus.ready && (
        <div
          onClick={toggleShowOtherControl}
          className="p-1 rounded-md cursor-pointer hover:bg-neutral-100"
        >
          <EllipsisVerticalIcon width={28} className="select-none" />
        </div>
      )}
    </div>
  );
};

export default OrderGridItemHeader;
