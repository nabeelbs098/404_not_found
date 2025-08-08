import type { LucideProps } from 'lucide-react';
import { Smile, Frown, Angry, Ghost } from 'lucide-react';

export const Icons = {
  Smile: (props: LucideProps) => <Smile {...props} />,
  Frown: (props: LucideProps) => <Frown {...props} />,
  Angry: (props: LucideProps) => <Angry {...props} />,
  Ghost: (props: LucideProps) => <Ghost {...props} />,
  Surprised: (props: LucideProps) => (
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
      <title>Surprised Icon</title>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  ),
};

export type IconName = keyof typeof Icons;
