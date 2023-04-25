import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeError: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`p-1 rounded-sm text-sm font-bold bg-red-300 text-red-900 lg:text-lg ${className ?? ''}`}
    >
     {children}
    </div>
  );
};

export default BadgeError;
