import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeSuccess: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`px-1 py-[2px] rounded-md text-sm font-medium bg-green-300 text-green-900 md:text-base ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgeSuccess;
