import React, { FC, useEffect, useState } from "react";
import { PrimaryButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";
import { useRouter } from "next/router";

const OrderCabinetsClosedConfirmationModal: FC = () => {
  const router = useRouter();
  const {
    closeCabinets,
    openCabinets,
    closeOrderModal,
    receiveOrder,
    returnOrder,
    orderConfirmationModal,
  } = useOrdersContext();
  const prevModalType =
    orderConfirmationModal.prevModalTypeToCabinetsClosedConfirmationModal;
  const [isCabinetsClosed, setIsCabinetsClosed] = useState(false);
  const MILLISECONDS_WAIT_UNTIL_PROMPT_TO_REOPEN_CABINETS = 5000;

  useEffect(() => {
    const handleWindowStartClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      if (
        orderConfirmationModal.isOpen &&
        orderConfirmationModal.modalType === "cabinetsToClose"
      ) {
        closeCabinets(orderConfirmationModal.orderCabinetNumbers);
      }
      setTimeout(() => {
        if (window.confirm("Reopen cabinets?")) {
          openCabinets(orderConfirmationModal.orderCabinetNumbers);
        } else {
          closeOrderModal();
        }
      }, MILLISECONDS_WAIT_UNTIL_PROMPT_TO_REOPEN_CABINETS);
      return;
    };
    const handleWindowClose = () => {
      if (
        orderConfirmationModal.isOpen &&
        orderConfirmationModal.modalType === "cabinetsToClose"
      ) {
        closeCabinets(orderConfirmationModal.orderCabinetNumbers);
      }
    };
    const handleBrowseAway = async () => {
      if (
        orderConfirmationModal.isOpen &&
        orderConfirmationModal.modalType === "cabinetsToClose"
      ) {
        await closeCabinets(orderConfirmationModal.orderCabinetNumbers);
        closeOrderModal();
      }
    };
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden") {
        if (
          orderConfirmationModal.isOpen &&
          orderConfirmationModal.modalType === "cabinetsToClose"
        ) {
          await closeCabinets(orderConfirmationModal.orderCabinetNumbers);
          closeOrderModal();
        }
      }
    };

    // fire when tab is hidden
    document.addEventListener("visibilitychange", handleVisibilityChange);
    // fire when internal page changes
    router.events.on("routeChangeStart", handleBrowseAway);
    // fire when tab starts to close
    window.addEventListener("beforeunload", handleWindowStartClose);
    // fire when tab is closing
    window.addEventListener("unload", handleWindowClose);

    return () => {
      window.addEventListener("unload", handleWindowClose);
      window.removeEventListener("beforeunload", handleWindowStartClose);
      router.events.off("routeChangeStart", handleBrowseAway);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    router,
    orderConfirmationModal,
    closeCabinets,
    openCabinets,
    closeOrderModal,
  ]);

  const confirmCabinetsClosed = () => {
    if (
      orderConfirmationModal.prevModalTypeToCabinetsClosedConfirmationModal ===
      "receive"
    ) {
      receiveOrder(orderConfirmationModal.orderId);
    }
    if (
      orderConfirmationModal.prevModalTypeToCabinetsClosedConfirmationModal ===
      "return"
    ) {
      returnOrder(orderConfirmationModal.orderId);
    }
    closeCabinets(orderConfirmationModal.orderCabinetNumbers);
    closeOrderModal();
  };

  return (
    <Modal>
      <div className="mb-4 space-y-1 font-medium leading-snug md:mb-5 md:text-lg md:space-y-0">
        <div className="text-lg ">
          <p>
            {`Close all cabinets related to your order after ${
              prevModalType === "receive" ? "receiving" : "returning"
            } them`}
          </p>
          <p>
            Cabinets to close:{" "}
            {orderConfirmationModal.orderCabinetNumbers.map(
              (cabinet, index) => (
                <span key={index} className="text-2xl text-blue-800 font-bold">
                  #{cabinet}{" "}
                </span>
              )
            )}
          </p>
          <p>
            {`Make sure that you ${
              prevModalType === "receive" ? "received" : "returned"
            } all books and closed all
            cabinets`}
          </p>
        </div>
      </div>
      <div>
        <CheckboxInput
          name="cabinets_closed"
          label={`I ${
            prevModalType === "receive" ? "received" : "returned"
          } all books ${
            prevModalType === "receive" ? "in" : "to"
          } corresponding cabinets and closed all cabinets`}
          checked={isCabinetsClosed}
          onChange={() => {
            const newIsCabinetsClosed = !isCabinetsClosed;
            setIsCabinetsClosed(newIsCabinetsClosed);
          }}
        />
      </div>
      <PrimaryButton
        onClick={confirmCabinetsClosed}
        disabled={!isCabinetsClosed}
        className="mt-3 md:mt-4"
      >
        {!isCabinetsClosed ? "Mark all checks" : "Finish"}
      </PrimaryButton>
    </Modal>
  );
};

export default OrderCabinetsClosedConfirmationModal;
