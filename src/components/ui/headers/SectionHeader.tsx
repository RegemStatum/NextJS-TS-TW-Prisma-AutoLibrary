import React, { FC } from "react";

interface Props {
  text: string;
}

const SectionHeader: FC<Props> = ({ text }) => {
  return (
    <div className="mb-5 space-y-1">
      <h2 className="text-2xl font-medium text-neutral-800 text-center leading-relaxed">
        {text}
      </h2>
      <div className="w-[70px] h-1 mx-auto bg-blue-400 rounded-md"></div>
    </div>
  );
};

export default SectionHeader;
