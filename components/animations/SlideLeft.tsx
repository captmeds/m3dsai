"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { slideLeft } from "@/lib/animations";

interface SlideLeftProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SlideLeft({ children, className = "", delay = 0 }: SlideLeftProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: slideLeft.hidden,
        visible: {
          ...slideLeft.visible,
          transition: { ...slideLeft.visible.transition, delay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
