import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeSuccess: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`px-1 rounded-md text-sm font-medium bg-green-300 text-green-900 lg:text-lg ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgeSuccess;
