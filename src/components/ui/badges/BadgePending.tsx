import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgePending: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`px-1 rounded-md text-sm font-medium bg-yellow-300 text-yellow-900 lg:text-lg ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgePending;
