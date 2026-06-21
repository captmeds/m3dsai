import { ArrowRight, Globe, Brain, TrendingUp, LayoutDashboard, Shield, Bot, Cloud } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Brain,
  TrendingUp,
  LayoutDashboard,
  Shield,
  Bot,
  Cloud,
};

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
  index: number;
}

export default function ServiceCard({ name, description, icon, href, index }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Globe;

  return (
    <div className="group relative transition-transform duration-300 hover:-translate-y-1" data-index={index}>
      <Link href={href} className="block">
        <div className="glass tech-surface rounded-lg p-8 h-full transition-all duration-300 group-hover:border-accent-primary/50 group-hover:shadow-lg group-hover:shadow-accent-glow">
          <div className="relative z-10 w-12 h-12 rounded-md bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center mb-6 group-hover:bg-accent-primary/20 transition-colors duration-300">
            <IconComponent className="w-6 h-6 text-accent-primary transition-transform duration-300" />
          </div>

          <h3 className="relative z-10 font-display text-xl font-bold text-text-primary mb-3">
            {name}
          </h3>

          <p className="relative z-10 text-text-secondary text-sm leading-relaxed mb-6">
            {description}
          </p>

          <span className="relative z-10 inline-flex items-center text-accent-primary text-sm font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
            Learn more 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </Link>
    </div>
  );
}
