import React, { FC, useState } from "react";
import { PrimaryButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";

const OrderReturnConfirmationModal: FC = () => {
  const ordersContext = useOrdersContext();
  const [isBooksReturned, setIsBooksReturned] = useState(false);
  const [isCabinetsClosed, setIsCabinetsClosed] = useState(false);

  const confirmOrderReturn = () => {
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
        <p>Please, return your books and close cabinets</p>
      </div>
      <div>
        <CheckboxInput
          name="books_returned"
          label="I returned all books"
          checked={isBooksReturned}
          onChange={() => {
            const newIsBooksReturned = !isBooksReturned;
            setIsBooksReturned(newIsBooksReturned);
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
        onClick={confirmOrderReturn}
        disabled={!isBooksReturned || !isCabinetsClosed}
        className="mt-3 md:mt-4"
      >
        {!isBooksReturned || !isCabinetsClosed
          ? "Mark all checks"
          : "Books returned"}
      </PrimaryButton>
    </Modal>
  );
};

export default OrderReturnConfirmationModal;
