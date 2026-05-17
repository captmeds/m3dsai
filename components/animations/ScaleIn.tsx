"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { scaleIn } from "@/lib/animations";

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScaleIn({ children, className = "", delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: scaleIn.hidden,
        visible: {
          ...scaleIn.visible,
          transition: { ...scaleIn.visible.transition, delay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
