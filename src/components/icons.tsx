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
      <path d="M2 6s1.5-2 5-2 5 2 5 2v14H2V6Z" />
      <path d="M12 6s1.5-2 5-2 5 2 5 2v14h-5" />
      <path d="M15 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      <path d="M20 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      <path d="M16 17.5c2.5 2.5 8 2.5 8 0" />
    </svg>
  );
}
