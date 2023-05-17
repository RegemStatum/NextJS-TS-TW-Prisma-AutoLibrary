import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SecondaryButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`block w-full py-2 px-4 text-blue-600 border border-blue-100 font-medium leading-tight rounded-md select-none hover:bg-blue-100 disabled:bg-neutral-200 disabled:text-neutral-400 md:py-3 ${
        rest.className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
