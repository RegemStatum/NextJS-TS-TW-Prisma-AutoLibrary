import pagesLinks from "@/utils/constants/pagesLinks";
import Link from "next/link";
import React, { FC } from "react";

const HeaderLinks: FC = () => {
  return (
    <div className="hidden lg:flex">
      {pagesLinks.map((pageLink) => {
        const { id, name, path } = pageLink;

        return (
          <Link
            key={id}
            href={path}
            className="px-6 py-2 text-xl font-bold hover:bg-stone-100  hover:text-sky-500 rounded-sm outline-slate-600 lg:text-2xl"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
