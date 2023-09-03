import pagesLinks from "@/utils/constants/pagesLinks";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { usePathname } from "next/navigation";

const HeaderLinks: FC = () => {
  const pathname = usePathname();
  const pageName = pathname.split("/").pop() || "home";

  useEffect(() => {
    console.log(pageName);
  }, [pageName]);

  return (
    <div className="hidden lg:flex">
      {pagesLinks.map((pageLink) => {
        const { id, name, path } = pageLink;

        return (
          <Link
            key={id}
            href={path}
            className={`h-fit px-5 py-2 hover:bg-neutral-100  hover:text-blue-500 rounded-md ${
              pageName === name.toLowerCase()
                ? "font-bold text-blue-500"
                : "font-semibold"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
