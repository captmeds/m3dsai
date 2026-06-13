"use client";

import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import { portfolioProjects } from "@/lib/portfolio";

export default function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {portfolioProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <PortfolioCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
