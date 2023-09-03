import { HTMLAttributes } from "react";

export default function MenuBars(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`w-[37px] space-y-[6px] ${props.className}`}>
      <div className="bg-neutral-800 h-[3px] rounded-md"></div>
      <div className="bg-neutral-800 h-[3px] rounded-md"></div>
    </div>
  );
}
