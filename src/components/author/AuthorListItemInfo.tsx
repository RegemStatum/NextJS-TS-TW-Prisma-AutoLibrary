import React, { FC } from "react";
import Image from "next/image";
import { Author } from "@prisma/client";

type authorInfo = Pick<Author, "authorImgUrl" | "firstName" | "secondName">;

interface Props {
  authorInfo: authorInfo;
}

const AuthorListItemInfo: FC<Props> = ({ authorInfo }) => {
  return (
    <div className="flex gap-4 lg:flex-col lg:gap-1">
      {/* image */}
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative lg:w-[200px] lg:h-[200px] ">
        <Image
          src={authorInfo.authorImgUrl}
          alt={authorInfo.firstName}
          fill
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL={authorInfo.authorImgUrl}
        />
      </div>
      {/* info */}
      <div className="py-2 flex flex-col justify-center lg:flex-row lg:justify-start lg:gap-2">
        <h4 className="text-lg lg:text-2xl">{authorInfo.firstName}</h4>
        <h4 className="text-lg font-bold lg:text-2xl">
          {authorInfo.secondName}
        </h4>
      </div>
    </div>
  );
};

export default AuthorListItemInfo;
