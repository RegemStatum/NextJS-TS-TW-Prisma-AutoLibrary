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
      className={`w-full p-2 bg-stone-600 text-slate-50 rounded-sm hover:bg-stone-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
