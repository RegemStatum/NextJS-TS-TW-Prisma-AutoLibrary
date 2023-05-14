import React, { FC } from "react";

// Warning modify status
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  status: string;
}

const OrderGridItemStatus: FC<Props> = ({ status, ...rest }) => {
  return (
    <div
      {...rest}
      className={`p-3 font-bold capitalize text-center ${rest.className || ""}`}
    >
      <p>{status}</p>
    </div>
  );
};

export default OrderGridItemStatus;
