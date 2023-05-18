import React, { FC, useState } from "react";
import { PrimaryButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";
import { IconWrapper, XMarkIcon } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import { useProfileContext } from "@/context/ProfileContext";
import { HIDE_AFTER_LONG_MILLISECONDS } from "@/utils/constants/misc";

const OrderReturnConfirmationModal: FC = () => {
  const { showInfoMessage } = useAppContext();
  const { setIsOrdersLoading } = useProfileContext();
  const {
    orderConfirmationModal: { orderId, orderNumber, orderCabinetNumbers },
    openCabinets,
    openOrderModal,
    closeOrderModal,
  } = useOrdersContext();
  const [isBooksReturned, setIsBooksReturned] = useState(false);

  const confirmOrderReturn = async () => {
    try {
      await openCabinets(orderCabinetNumbers);
      openOrderModal(
        "cabinetsToClose",
        orderCabinetNumbers,
        orderId,
        orderNumber,
        "return"
      );
    } catch (e: any) {
      console.log(e);
      setIsOrdersLoading(false);
      closeOrderModal();
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later",
        HIDE_AFTER_LONG_MILLISECONDS
      );
    }
  };

  return (
    <Modal>
      <div className="mb-4 space-y-1 font-medium leading-snug md:mb-5 md:text-lg md:space-y-0">
        <div className="flex items-center justify-between text-lg ">
          <p>
            Your cabinets:{" "}
            {orderCabinetNumbers.map((cabinet, index) => (
              <span key={index} className="text-2xl text-blue-800 font-bold">
                #{cabinet}{" "}
              </span>
            ))}
          </p>
          <IconWrapper onClick={closeOrderModal}>
            <XMarkIcon width={26} />
          </IconWrapper>
        </div>
      </div>
      <div>
        <CheckboxInput
          name="books_returned"
          label="I am ready to return all books"
          checked={isBooksReturned}
          onChange={() => {
            const newIsBooksReturned = !isBooksReturned;
            setIsBooksReturned(newIsBooksReturned);
          }}
        />
      </div>
      <PrimaryButton
        onClick={confirmOrderReturn}
        disabled={!isBooksReturned}
        className="mt-3 md:mt-4"
      >
        {!isBooksReturned ? "Mark all checks" : "Open cabinets"}
      </PrimaryButton>
    </Modal>
  );
};

export default OrderReturnConfirmationModal;
