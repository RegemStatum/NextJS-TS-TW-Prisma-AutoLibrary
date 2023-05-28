import { OrderInfoStatus } from "@/types/misc/OrderInfo";
import React, { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  status: OrderInfoStatus;
  textClassName?: string;
  indicatorClassName?: string;
}

const OrderGridItemStatus: FC<Props> = ({
  status,
  textClassName,
  indicatorClassName,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`p-1 h-fit flex items-center gap-1 font-bold capitalize text-center md:text-lg ${
        rest.className || ""
      }`}
    >
      <div className={`w-2 h-2 rounded-full ${indicatorClassName}`}></div>
      <p className={textClassName}>{status}</p>
    </div>
  );
};

export default OrderGridItemStatus;
