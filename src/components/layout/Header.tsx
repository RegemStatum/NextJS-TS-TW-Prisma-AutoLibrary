import React, { FC } from "react";
import pagesLinks from "@/utils/pagesLinks";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex flex-row items-center ">
      {/* logo */}
      <div>
        <h2 className="font-bold">Auto Library</h2>
      </div>
      {/* links */}
      <div className="flex flex-row gap-2 text-blue-800">
        {pagesLinks.map((pageLink) => {
          const { id, name, path } = pageLink;

          return (
            <Link key={id} href={path}>
              {name}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
