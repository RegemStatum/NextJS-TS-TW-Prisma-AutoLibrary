import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const IconWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="p-1 group inline-block relative rounded-md shrink-0 select-none cursor-pointer hover:bg-neutral-200 hover:bg-opacity-70">
      {children}
    </div>
  );
};

export default IconWrapper;
