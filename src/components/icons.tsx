import type { SVGProps } from "react";

export function EmotiScrollLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
      <path d="M14 21h-4" />
      <path d="M14 3v4a2 2 0 0 0 2 2h4" />
      <path d="M17.5 17a2.5 2.5 0 0 1-5 0" />
      <path d="M15 14.5v-1" />
      <path d="M20 14.5v-1" />
    </svg>
  );
}
