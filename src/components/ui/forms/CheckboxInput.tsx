import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const CheckboxInput: FC<Props> = ({ name, label, ...rest }) => {
  return (
    <div className="flex gap-2 cursor-pointer">
      <input id={name} type="checkbox" {...rest}></input>
      <label htmlFor={name} className="cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
