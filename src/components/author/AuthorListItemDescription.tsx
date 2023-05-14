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
    <div className="py-4 text-sm font-medium md:py-3 md:text-base lg:leading-relaxed lg:pr-6 xl:pr-12">
      {isMoreDescription ? description : `${description.substring(0, 150)}...`}
    </div>
  );
};

export default AuthorListItemDescription;
