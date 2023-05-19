import OrderInfo, { OrderStatus } from "@/types/misc/OrderInfo";
import React, { FC, useState } from "react";
import OrderGridItemBooksGrid from "./OrderGridItemBooksGrid";
import OrderGridItemStatuses from "./OrderGridItemStatuses";
import OrderGridItemOtherControl from "./OrderGridItemOtherControl";
import OrderGridItemMainControl from "./OrderGridItemMainControl";
import OrderGridItemHeader from "./OrderGridItemHeader";

interface Props {
  order: OrderInfo;
}

const OrderGridItem: FC<Props> = ({ order }) => {
  const [isOtherControlOpen, setIsOtherControlOpen] = useState(false);

  const toggleShowOtherControl = () => {
    isOtherControlOpen
      ? setIsOtherControlOpen(false)
      : setIsOtherControlOpen(true);
  };

  return (
    <div className="max-w-[1100px] relative rounded-md outline outline-1 outline-neutral-200 shadow-lg overflow-hidden">
      {order.status === OrderStatus.ready && (
        <OrderGridItemOtherControl
          isOpen={isOtherControlOpen}
          orderId={order.id}
          orderNumber={order.number}
        />
      )}
      <OrderGridItemStatuses status={order.status} />
      <div className="p-2 md:p-5 md:pt-4">
        <div className="mt-1 mb-4 md:mb-7">
          <OrderGridItemHeader
            orderStatus={order.status}
            orderNumber={order.number}
            toggleShowOtherControl={toggleShowOtherControl}
          />
        </div>
        <div>
          <OrderGridItemBooksGrid books={order.Book} />
        </div>
        <div className="mt-3">
          <OrderGridItemMainControl
            status={order.status}
            orderId={order.id}
            orderNumber={order.number}
            orderCabinetNumbers={order.Book.map(
              (book) => book.cabinet?.number || -1
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderGridItem;
