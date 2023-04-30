import React, { FC } from "react";

const FormSeparator: FC = () => {
  return (
    <div className="my-3 flex gap-3 items-center">
      <div className="w-full h-[1px] bg-stone-400 rounded-md"></div>
      <p className="text-lg lg:text-xl">or</p>
      <div className="w-full h-[1px] bg-stone-400 rounded-md"></div>
    </div>
  );
};

export default FormSeparator;
