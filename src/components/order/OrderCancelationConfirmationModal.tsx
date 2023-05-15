import React, { FC, useState } from "react";
import { DeleteButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";

const OrderCancelationConfirmationModal: FC = () => {
  const ordersContext = useOrdersContext();
  const [isWillingToCancel, setIsWillingToCancel] = useState(false);

  const confirmOrderCancelation = () => {
    ordersContext.cancelOrder(ordersContext.orderConfirmationModal.orderId);
    ordersContext.closeOrderModal();
  };

  return (
    <Modal>
      <div className="mb-4 space-y-1 font-medium leading-snug md:mb-5 md:text-lg md:space-y-0">
        <div className="flex items-center justify-between text-lg ">
          <p>
            Cancel order number #
            {ordersContext.orderConfirmationModal.orderNumber}
          </p>
        </div>
      </div>
      <div>
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
        className="mt-3 md:mt-4"
      >
        {!isWillingToCancel ? "Mark all checks" : "Cancel order"}
      </DeleteButton>
    </Modal>
  );
};

export default OrderCancelationConfirmationModal;
