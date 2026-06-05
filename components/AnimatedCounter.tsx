"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ 
  target, 
  suffix = "", 
  prefix = "",
  duration = 2,
  className = "" 
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setDisplayValue(Math.round(value));
        }
      });

      return () => controls.stop();
    }
  }, [isInView, target, duration]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono font-bold ${className}`}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{isInView ? displayValue : target}{suffix}
    </motion.span>
  );
}
