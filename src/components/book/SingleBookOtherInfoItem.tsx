import React, { FC } from "react";

interface Props {
  name: string;
  info: string;
}

const SingleBookOtherInfoItem: FC<Props> = ({ name, info }) => {
  return (
    <div className="w-[110px] min-w-[110px] p-1 border-1 border-black shrink-0 lg:w-[150px] lg:min-w-[150px]">
      <h4 className="h-[40px] mb-2 font-medium leading-tight lg:h-[30px] lg:text-lg">
        {name}
      </h4>
      <p className="leading-tight capitalize lg:text-lg">{info}</p>
    </div>
  );
};

export default SingleBookOtherInfoItem;
