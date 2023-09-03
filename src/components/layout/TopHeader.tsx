import React, { FC } from "react";
import Link from "next/link";

const TopHeader: FC = () => {
  return (
    <div>
      <div className="flex items-center justify-end gap-1 text-sm">
        <Link
          className=" hover:underline underline-offset-2"
          href="tel:+380951234455"
        >
          +(380) 95-123-44-55
        </Link>
        <p> | </p>
        <Link href="tel:+380951234455">About us</Link>
      </div>
    </div>
  );
};

export default TopHeader;
