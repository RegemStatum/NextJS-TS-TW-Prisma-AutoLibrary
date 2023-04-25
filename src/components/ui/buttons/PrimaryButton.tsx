import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
}

const PrimaryButton: FC<Props> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-2 bg-stone-600 text-slate-50 font-bold rounded-sm select-none hover:bg-stone-800  lg:p-4 lg:text-2xl  ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
