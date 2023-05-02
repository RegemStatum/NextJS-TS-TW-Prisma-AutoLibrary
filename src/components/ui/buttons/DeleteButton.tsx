import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DeleteButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-full p-2 bg-red-500 text-white font-bold rounded-sm select-none hover:bg-red-700 disabled:bg-red-200 disabled:text-red-400 lg:text-xl ${
        rest.className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
