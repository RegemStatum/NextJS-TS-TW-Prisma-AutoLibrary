import React, { FC } from "react";
import { BadgeError } from "../badges";
import { XMarkIcon } from "../icons";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errorMsg: string;
  clearInput: () => void;
}

const Input: FC<Props> = ({ name, label, errorMsg, clearInput, ...rest }) => {
  return (
    <div className="relative">
      {rest.value !== "" && (
        <XMarkIcon
          width={27}
          onClick={clearInput}
          className="absolute top-[8px] right-[8px] md:top-[12px] md:right-[12px] md:cursor-pointer"
        />
      )}
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
        className=" block w-full p-2 pr-[37px] bg-gray-50 border border-gray-300 text-gray-900 rounded-md placeholder-slate-400 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-red-500 invalid:text-red-600
        focus:invalid:border-red-500 focus:invalid:ring-red-500
        md:p-3 md:text-lg md:leading-tight"
      />
      {errorMsg && (
        <div className="mt-2">
          <BadgeError>{errorMsg}</BadgeError>
        </div>
      )}
    </div>
  );
};

export default Input;
