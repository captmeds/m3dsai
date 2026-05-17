"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  index: number;
}

export default function TestimonialCard({ quote, name, company, role, rating, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-8 relative"
    >
      <Quote className="w-10 h-10 text-accent-primary/20 absolute top-6 right-6" />

      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-muted'}`} 
          />
        ))}
      </div>

      <p className="text-text-primary text-base leading-relaxed mb-8 relative z-10">
        "{quote}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-display font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-display font-semibold text-text-primary">{name}</h4>
          <p className="text-text-secondary text-sm">{role} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
}
