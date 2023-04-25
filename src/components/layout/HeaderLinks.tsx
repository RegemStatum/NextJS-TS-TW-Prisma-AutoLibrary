import pagesLinks from "@/utils/pagesLinks";
import Link from "next/link";
import React, { FC } from "react";

const HeaderLinks: FC = () => {
  return (
    <div className="hidden lg:flex gap-2 font-bold text-xl  ">
      {pagesLinks.map((pageLink) => {
        const { id, name, path } = pageLink;

        return (
          <Link
            key={id}
            href={path}
            className="px-4 py-2 hover:outline hover:text-slate-700 rounded-sm outline-1 outline-slate-600"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
