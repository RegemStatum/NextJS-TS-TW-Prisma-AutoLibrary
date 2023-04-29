import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: FC<Props> = ({ children, ...rest }) => {
  const className = `w-full p-2 bg-stone-600 text-slate-50 font-bold rounded-sm select-none hover:bg-stone-800  lg:p-4 lg:text-xl  ${
    rest.className ?? ""
  }`;

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default PrimaryButton;
