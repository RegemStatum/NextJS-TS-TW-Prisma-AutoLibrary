import React, { FC } from "react";
import { BadgeError } from "../badges";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errorMsg: string;
}

const Input: FC<Props> = ({ name, label, errorMsg, ...rest }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-md font-medium text-gray-900 lg:text-lg"
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        id={name}
        name={name}
        className=" block w-full p-2 text-sm bg-gray-50 border border-gray-300 text-gray-900  rounded-md placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-red-500 invalid:text-red-600
        focus:invalid:border-red-500 focus:invalid:ring-red-500
        lg:p-3 lg:text-lg"
      />
      {errorMsg && <BadgeError className="mt-2">{errorMsg}</BadgeError>}
    </div>
  );
};

export default Input;
