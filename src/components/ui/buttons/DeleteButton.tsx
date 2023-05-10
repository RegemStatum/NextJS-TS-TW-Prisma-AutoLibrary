import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DeleteButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`block w-full py-2 px-4 bg-blue-600 text-slate-50 font-medium rounded-md select-none hover:bg-blue-700 disabled:bg-neutral-200 disabled:text-neutral-400 ${
        rest.className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
