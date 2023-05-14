import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeError: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`px-1 rounded-md text-sm font-medium bg-red-300 text-red-900 md:text-base ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgeError;
