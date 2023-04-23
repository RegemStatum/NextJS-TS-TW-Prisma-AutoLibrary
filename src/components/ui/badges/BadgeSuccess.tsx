import React, { FC } from "react";

interface Props {
  children: String;
}

const BadgeSuccess: FC<Props> = ({ children }) => {
  return (
    <div className="p-1 rounded-sm text-sm font-bold bg-green-300 text-green-900 lg:text-lg">
      <p>{children}</p>
    </div>
  );
};

export default BadgeSuccess;
