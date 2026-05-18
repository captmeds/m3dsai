"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export default function GlowButton({ 
  children, 
  href, 
  onClick, 
  variant = "primary",
  className = "",
  type = "button"
}: GlowButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-accent-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25",
    ghost: "bg-transparent border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary",
    outline: "bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white"
  };

<<<<<<< HEAD
  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </Link>
=======
  const MotionLink = motion(Link);

  if (href) {
    return (
      <MotionLink
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
      </MotionLink>
>>>>>>> 6f4f8b10402604c82ee3cc38635c5e94d160c351
    );
  }

  return (
    <motion.button
      onClick={onClick}
      type={type}
<<<<<<< HEAD
      className={combinedClassName}
=======
      className={`${baseStyles} ${variants[variant]} ${className}`}
>>>>>>> 6f4f8b10402604c82ee3cc38635c5e94d160c351
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  );
}
