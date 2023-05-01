import { useAppContext } from "@/context/AppContext";
import pagesLinks from "@/utils/constants/pagesLinks";
import Link from "next/link";
import React, { FC } from "react";

const SidebarLinks: FC = () => {
  const appContext = useAppContext();

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {pagesLinks.map((pageLink) => {
        const { id, name, path, LinkIcon } = pageLink;

        return (
          <Link
            key={id}
            href={path}
            onClick={() => {
              setTimeout(() => {
                appContext.closeSidebar();
              }, 300);
            }}
            className="flex flex-row gap-3 hover:text-sky-500"
          >
            <LinkIcon width={32} height={32} />
            <p className="w-[100px] font-medium text-2xl">{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarLinks;
