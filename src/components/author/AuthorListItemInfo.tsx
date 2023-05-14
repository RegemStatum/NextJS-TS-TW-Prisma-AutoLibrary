import React, { FC } from "react";
import Image from "next/image";
import { Author } from "@prisma/client";

type authorInfo = Pick<Author, "authorImgUrl" | "firstName" | "secondName">;

interface Props {
  authorInfo: authorInfo;
}

const AuthorListItemInfo: FC<Props> = ({ authorInfo }) => {
  return (
    <div className="flex gap-4 md:gap-5 lg:flex-col lg:gap-1">
      {/* image */}
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative md:w-[150px] md:h-[150px]">
        <Image
          src={authorInfo.authorImgUrl}
          alt={authorInfo.firstName}
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={authorInfo.authorImgUrl}
          width={200}
          height={200}
        />
      </div>
      {/* info */}
      <div className="py-2 flex flex-col justify-center md:flex-row md:justify-start md:items-center md:gap-2">
        <h4 className="text-lg leading-6  md:text-2xl lg:leading-normal">
          {authorInfo.firstName}
        </h4>
        <h4 className="text-lg leading-6 font-bold md:text-2xl lg:leading-normal">
          {authorInfo.secondName}
        </h4>
      </div>
    </div>
  );
};

export default AuthorListItemInfo;
