"use client";

import { motion } from "framer-motion";

const clients = [
  "TechFlow", "RetailMax", "SecureFinance", "GrowthMarketing", "StartupBoost", "MediCare Plus"
];

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-border bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            Trusted by innovative companies
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <span className="font-display text-xl font-bold text-text-muted/50 group-hover:text-text-muted transition-colors duration-300">
                  {client}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
