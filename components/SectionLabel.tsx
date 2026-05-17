"use client";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <span className={`font-mono text-xs uppercase tracking-[0.2em] text-accent-primary ${className}`}>
      {text}
    </span>
  );
}
