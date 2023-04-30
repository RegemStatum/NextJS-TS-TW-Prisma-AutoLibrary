import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeInfo: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`p-1 rounded-sm text-sm font-bold bg-sky-300 text-sky-900 lg:text-lg ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgeInfo;
