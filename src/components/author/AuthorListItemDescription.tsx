import React, { FC } from "react";

interface Props {
  description: string;
  isMoreDescription: boolean;
}

const AuthorListItemDescription: FC<Props> = ({
  isMoreDescription,
  description,
}) => {
  return (
    <div className="py-2 text-sm font-medium">
      {isMoreDescription ? description : `${description.substring(0, 150)}...`}
    </div>
  );
};

export default AuthorListItemDescription;
