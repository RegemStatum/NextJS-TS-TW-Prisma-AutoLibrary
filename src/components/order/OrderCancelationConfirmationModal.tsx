import React, { FC, useState } from "react";
import { DeleteButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";
import Image from "next/image";
import { IconWrapper, XMarkIcon } from "../ui/icons";

const OrderCancelationConfirmationModal: FC = () => {
  const {
    cancelOrder,
    closeOrderModal,
    orderConfirmationModal: { orderId, orderNumber },
  } = useOrdersContext();
  const [isWillingToCancel, setIsWillingToCancel] = useState(false);

  const confirmOrderCancelation = () => {
    cancelOrder(orderId);
    closeOrderModal();
  };

  return (
    <Modal className="max-w-[500px]">
      <div className="w-full min-h-[225px] mt-4 mb-6 relative rounded-md md:mt-6 md:mb-10">
        <Image
          src="/images/undraw_cancel.svg"
          alt="cancel"
          fill
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL="/images/undraw_cancel.svg"
          className="block max-h-[320px] h-fit"
        />
      </div>
      <div className="p-2 md:p-3">
        <div className="mb-8 space-y-1 font-medium leading-snug">
          <div className="flex items-center justify-between text-xl">
            <div className="flex gap-3 align-center">
              <p className="text-start font-medium leading-8">Cancel order:</p>
              <span className="text-2xl font-bold text-blue-600">
                {orderNumber}
              </span>
            </div>
            <IconWrapper onClick={closeOrderModal}>
              <XMarkIcon width={24} />
            </IconWrapper>
          </div>
        </div>
        <div className="text-lg">
          <CheckboxInput
            name="books_received"
            label="I want to cancel order"
            checked={isWillingToCancel}
            onChange={() => {
              const newIsWillingToCancel = !isWillingToCancel;
              setIsWillingToCancel(newIsWillingToCancel);
            }}
          />
        </div>
        <DeleteButton
          onClick={confirmOrderCancelation}
          disabled={!isWillingToCancel}
          className="mt-2 md:mt-3"
        >
          {!isWillingToCancel ? "Mark all checks" : "Cancel order"}
        </DeleteButton>
      </div>
    </Modal>
  );
};

export default OrderCancelationConfirmationModal;
