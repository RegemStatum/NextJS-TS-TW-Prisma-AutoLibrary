import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeSuccess: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`p-1 rounded-sm text-sm font-bold bg-green-300 text-green-900 lg:text-lg ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgeSuccess;
