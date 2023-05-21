import React, { FC, useState } from "react";
import { PrimaryButton } from "../ui/buttons";
import CheckboxInput from "../ui/forms/CheckboxInput";
import { useOrdersContext } from "@/context/OrdersContext";
import { Modal } from "../ui/modals";
import { IconWrapper, XMarkIcon } from "../ui/icons";
import { useAppContext } from "@/context/AppContext";
import { useProfileContext } from "@/context/ProfileContext";
import { HIDE_AFTER_LONG_MSEC } from "@/utils/constants/misc";
import Image from "next/image";

const OrderReceptionConfirmationModal: FC = () => {
  const { showInfoMessage } = useAppContext();
  const { setIsOrdersLoading } = useProfileContext();
  const {
    orderConfirmationModal: { orderId, orderNumber, orderCabinetNumbers },
    openCabinets,
    openOrderModal,
    closeOrderModal,
  } = useOrdersContext();
  const [isBooksReadyToBeReceived, setIsBooksReadyToBeReceived] =
    useState(false);

  const confirmOrderReception = async () => {
    try {
      await openCabinets(orderCabinetNumbers);
      openOrderModal(
        "cabinetsToClose",
        orderCabinetNumbers,
        orderId,
        orderNumber
      );
    } catch (e: any) {
      console.log(e);
      setIsOrdersLoading(false);
      closeOrderModal();
      showInfoMessage(
        "error",
        e.message || "Something went wrong. Try again later",
        HIDE_AFTER_LONG_MSEC
      );
    }
  };

  return (
    <Modal className="max-w-[500px]">
      <div className="w-full min-h-[225px] relative rounded-md mt-6 mb-10">
        <Image
          src="/images/undraw_unboxing.svg"
          alt="receive"
          fill
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL="/images/undraw_unboxing.svg"
          className="block max-h-[320px] h-fit"
        />
      </div>
      <div className="p-2 md:p-3">
        <div className="mb-8 space-y-1 font-medium leading-snug">
          <div className="flex items-center justify-between text-lg">
            <div className="flex gap-3 align-center text-xl">
              <p className="font-medium">Cabinets:</p>
              <p>
                {orderCabinetNumbers.map((cabinet, index) => (
                  <span key={index} className="text-blue-600 font-bold">
                    #{cabinet}
                    {index !== orderCabinetNumbers.length - 1 ? "," : ""}{" "}
                  </span>
                ))}
              </p>
            </div>
            <IconWrapper onClick={closeOrderModal}>
              <XMarkIcon width={24} />
            </IconWrapper>
          </div>
        </div>
        <div>
          <CheckboxInput
            name="books_received"
            label="I am ready to receive my books"
            checked={isBooksReadyToBeReceived}
            onChange={() => {
              const newIsBooksReadyToBeReceived = !isBooksReadyToBeReceived;
              setIsBooksReadyToBeReceived(newIsBooksReadyToBeReceived);
            }}
          />
        </div>
        <PrimaryButton
          onClick={confirmOrderReception}
          disabled={!isBooksReadyToBeReceived}
          className="mt-3"
        >
          {!isBooksReadyToBeReceived ? "Mark all checks" : "Open cabinets"}
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default OrderReceptionConfirmationModal;
