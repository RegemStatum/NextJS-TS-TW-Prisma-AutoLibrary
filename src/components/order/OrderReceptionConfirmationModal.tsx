import React, { FC, useState } from "react";
import { PrimaryButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";

const OrderReceptionConfirmationModal: FC = () => {
  const ordersContext = useOrdersContext();
  const [isBooksReceived, setIsBooksReceived] = useState(false);
  const [isCabinetsClosed, setIsCabinetsClosed] = useState(false);

  const confirmOrderReception = () => {
    ordersContext.closeCabinets(
      ordersContext.orderConfirmationModal.orderCabinetNumbers
    );
    ordersContext.closeOrderModal();
  };

  return (
    <Modal>
      <div className="mb-4 space-y-1 font-medium leading-snug md:mb-5 md:text-lg md:space-y-0">
        <div className="flex items-center justify-between text-lg ">
          <p>
            Your cabinets:{" "}
            {ordersContext.orderConfirmationModal.orderCabinetNumbers.map(
              (cabinet, index) => (
                <span key={index} className="text-2xl text-blue-800 font-bold">
                  #{cabinet}{" "}
                </span>
              )
            )}
          </p>
        </div>
        <p>Please, take your books and close cabinets</p>
      </div>
      <div>
        <CheckboxInput
          name="books_received"
          label="I received my books"
          checked={isBooksReceived}
          onChange={() => {
            const newIsBooksReceived = !isBooksReceived;
            setIsBooksReceived(newIsBooksReceived);
          }}
        />
        <CheckboxInput
          name="cabinets_closed"
          label="I closed all cabinets"
          checked={isCabinetsClosed}
          onChange={() => {
            const newIsCabinetsClosed = !isCabinetsClosed;
            setIsCabinetsClosed(newIsCabinetsClosed);
          }}
        />
      </div>
      <PrimaryButton
        onClick={confirmOrderReception}
        disabled={!isBooksReceived || !isCabinetsClosed}
        className="mt-3 md:mt-4"
      >
        {!isBooksReceived || !isCabinetsClosed
          ? "Mark all checks"
          : "Books received"}
      </PrimaryButton>
    </Modal>
  );
};

export default OrderReceptionConfirmationModal;
