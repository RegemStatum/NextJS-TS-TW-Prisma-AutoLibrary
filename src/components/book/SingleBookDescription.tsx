import React, { FC, useState } from "react";
import { SecondaryButton } from "../ui/buttons";

interface Props {
  description: string;
}

const SingleBookDescription: FC<Props> = ({ description }) => {
  const [isFullDescription, setIsFullDescription] = useState(false);

  const handleToggleDescription = () => {
    const newIsFullDescription = !isFullDescription;
    setIsFullDescription(newIsFullDescription);
  };

  return (
    <div className="mt-1 xl:max-w-[810px] xl:max-h-[313px] xl:overflow-auto scrollbar xl:pr-4">
      <p
        className={`text-sm lg:text-xl ${
          isFullDescription ? "" : "line-clamp-5"
        } xl:line-clamp-none `}
      >
        {description}
      </p>
      <SecondaryButton
        onClick={() => handleToggleDescription()}
        className="mt-2 mb-1 xl:hidden"
      >
        {isFullDescription ? "Less Description" : "Full description"}
      </SecondaryButton>
    </div>
  );
};

export default SingleBookDescription;
