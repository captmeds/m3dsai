"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface ServiceAccordionProps {
  items: {
    title: string;
    description: string;
    features: string[];
  }[];
}

export default function ServiceAccordion({ items }: ServiceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
          >
            <h3 className="font-display text-lg font-bold text-text-primary">{item.title}</h3>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="px-6 pb-6">
                  <p className="text-text-secondary mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-accent-secondary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
