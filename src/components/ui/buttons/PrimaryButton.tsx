import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  onClick?: any;
}

const PrimaryButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-2 bg-stone-500 text-slate-50 "
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
