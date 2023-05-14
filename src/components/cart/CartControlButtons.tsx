import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";

interface Props {
  clearCart: () => void;
  handleOrder: () => Promise<void>;
}

const CartControlButtons: FC<Props> = ({ clearCart, handleOrder }) => {
  return (
    <div className="mt-5 flex flex-col gap-1 lg:w-[calc(50%_-_8px)] xl:w-[calc(33.33%_-_8px)] lg:flex-row lg:justify-between">
      <PrimaryButton onClick={async () => await handleOrder()}>
        Order
      </PrimaryButton>
      <SecondaryButton onClick={() => clearCart()}>
        Remove all books
      </SecondaryButton>
    </div>
  );
};

export default CartControlButtons;
