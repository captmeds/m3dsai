"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  client: string;
  service: string;
  title: string;
  outcome: string;
  index: number;
}

export default function ProjectCard({ client, service, title, outcome, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/our-work/`} className="block">
        <div className="glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-accent-primary/50 group-hover:shadow-lg group-hover:shadow-accent-glow">
          <div className="aspect-[4/3] bg-gradient-to-br from-bg-secondary to-bg-card relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-primary/20 transition-colors">
                  <span className="font-display text-3xl font-bold text-accent-primary">
                    {client.charAt(0)}
                  </span>
                </div>
                <p className="text-text-muted text-sm font-mono">{client}</p>
              </div>
            </div>

            <div className="absolute inset-0 bg-accent-primary/0 group-hover:bg-accent-primary/10 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowUpRight className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-accent-primary uppercase tracking-wider">
                {service}
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
              {title}
            </h3>

            <p className="text-accent-secondary text-sm font-medium">
              {outcome}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
