import { ReactNode } from "react";
import Link from "next/link";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  target,
  rel,
  disabled = false,
}: GlowButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-sm tracking-wide rounded-md transition-all duration-300 overflow-hidden group hover:scale-[1.03] active:scale-[0.98]";
  
  const variants = {
    primary: "bg-accent-primary text-accent-on hover:bg-accent-hover shadow-lg shadow-accent-glow",
    ghost: "bg-bg-card/40 border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary",
    outline: "bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-on"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} target={target} rel={rel}>
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${combinedClassName} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
}
