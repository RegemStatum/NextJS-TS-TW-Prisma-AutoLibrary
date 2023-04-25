import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
}

const SecondaryButton: FC<Props> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-2 border-2 text-stone-800 border-stone-600 font-medium rounded-sm select-none hover:border-stone-800 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
