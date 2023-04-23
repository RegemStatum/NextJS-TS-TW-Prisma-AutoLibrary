import React, { FC } from "react";

interface Props {
  children: String;
}

const BadgePending: FC<Props> = ({ children }) => {
  return (
    <div className="p-1 rounded-sm text-sm font-bold bg-yellow-300 text-yellow-900 lg:text-lg">
      <p>{children}</p>
    </div>
  );
};

export default BadgePending;
