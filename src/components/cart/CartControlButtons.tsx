import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import { useCartContext } from "@/context/CartContext";

interface Props {
  handleOrder: () => Promise<void>;
}

const CartControlButtons: FC<Props> = ({ handleOrder }) => {
  const { clearCart } = useCartContext();

  return (
    <div className="mt-5 flex flex-col gap-1 lg:w-[calc(50%_-_8px)] xl:w-[calc(33.33%_-_8px)] lg:flex-row lg:justify-between">
      <PrimaryButton onClick={handleOrder}>Order</PrimaryButton>
      <SecondaryButton onClick={clearCart}>Remove all books</SecondaryButton>
    </div>
  );
};

export default CartControlButtons;
