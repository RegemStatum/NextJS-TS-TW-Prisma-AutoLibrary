import { SVGAttributes } from "react";

export default function MenuBars(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      ></path>
    </svg>
  );
}
