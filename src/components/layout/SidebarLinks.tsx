import { useAppContext } from "@/context/AppContext";
import pagesLinks from "@/utils/constants/pagesLinks";
import Link from "next/link";
import React, { FC } from "react";

const SidebarLinks: FC = () => {
  const appContext = useAppContext();

  return (
    <div className="w-full mx-auto flex flex-col gap-1 justify-center items-left">
      {pagesLinks.map((pageLink) => {
        const { id, name, path, LinkIcon } = pageLink;
        return (
          <Link
            key={id}
            href={path}
            className="group px-5 py-2 flex flex-row gap-5 rounded-full overflow-hidden hover:bg-slate-200 hover:text-blue-500"
            onClick={() => {
              appContext.closeSidebar();
            }}
          >
            <LinkIcon width={32} height={32} />
            <p className="font-medium text-2xl leading-[1.45]">{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarLinks;
