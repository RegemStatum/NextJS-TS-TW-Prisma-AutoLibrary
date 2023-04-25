import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgePending: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`p-1 rounded-sm text-sm font-bold bg-yellow-300 text-yellow-900 lg:text-lg ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default BadgePending;
