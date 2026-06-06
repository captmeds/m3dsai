import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  return <div className={className} data-delay={delay}>{children}</div>;
}
