import React, { FC } from "react";

interface Props {
  text: string;
}

const SectionHeader: FC<Props> = ({ text }) => {
  return (
    <div className="mb-2 md:mb-6">
      <h2 className="text-2xl font-bold text-blue-500 text-center leading-loose md:text-3xl">
        {text}
      </h2>
      {/* <div className="w-[50px] h-1 mx-auto bg-blue-400 rounded-sm"></div> */}
    </div>
  );
};

export default SectionHeader;
