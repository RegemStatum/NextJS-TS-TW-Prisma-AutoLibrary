import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SecondaryButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-full p-2 border-2 text-stone-800 border-stone-600 font-medium rounded-sm select-none hover:bg-stone-100 lg:p-4 lg:text-xl ${
        rest.className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
