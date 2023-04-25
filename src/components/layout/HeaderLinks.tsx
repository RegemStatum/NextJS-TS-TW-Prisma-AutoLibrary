import pagesLinks from "@/utils/pagesLinks";
import Link from "next/link";
import React, { FC } from "react";

const HeaderLinks: FC = () => {
  return (
    <div className="hidden lg:flex gap-2">
      {pagesLinks.map((pageLink) => {
        const { id, name, path } = pageLink;

        return (
          <Link
            key={id}
            href={path}
            className="px-4 py-2 text-xl font-bold hover:outline hover:bg-slate-50 rounded-sm outline-1 outline-slate-600 lg:text-2xl"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
