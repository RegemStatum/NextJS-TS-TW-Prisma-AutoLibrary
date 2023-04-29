import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMsg: string;
}

const Input: FC<Props> = ({ name, label, errorMsg, ...rest }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
      />
    </div>
  );
};

export default Input;
