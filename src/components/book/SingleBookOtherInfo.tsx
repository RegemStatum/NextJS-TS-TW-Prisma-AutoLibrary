import React, { FC } from "react";
import SingleBookOtherInfoItem from "./SingleBookOtherInfoItem";
import SingleBookOtherInfoSeparator from "./SingleBookOtherInfoSeparator";

type OtherInfoItem = {
  id: number;
  name: string;
  info: string;
};

interface Props {
  infoArr: OtherInfoItem[];
}

const SingleBookOtherInfo: FC<Props> = ({ infoArr }) => {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {infoArr.map((infoItem) => {
        return (
          <React.Fragment key={infoItem.id}>
            <SingleBookOtherInfoItem
              name={infoItem.name}
              info={infoItem.info}
            />
            {infoItem.id !== infoArr.length && <SingleBookOtherInfoSeparator />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SingleBookOtherInfo;
