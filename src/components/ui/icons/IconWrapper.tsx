import React, { FC } from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const IconWrapper: FC<Props> = ({ children, ...rest }) => {
  return (
    <div
      className="p-1 group inline-block relative rounded-md shrink-0 select-none cursor-pointer hover:bg-neutral-200 hover:bg-opacity-70"
      {...rest}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
