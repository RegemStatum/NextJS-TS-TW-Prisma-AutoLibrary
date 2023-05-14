import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BadgeInfo: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`px-1 rounded-md text-sm font-medium bg-sky-300 text-sky-900 md:text-base ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default BadgeInfo;
