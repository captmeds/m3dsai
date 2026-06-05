"use client";

export const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const staggerContainer = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    } 
  }
};

export const scaleIn = {
  hidden: { opacity: 1, scale: 1 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export const slideLeft = {
  hidden: { opacity: 1, x: 0 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(56,189,248,0.15)",
      "0 0 40px rgba(34,211,238,0.3)",
      "0 0 20px rgba(56,189,248,0.15)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
