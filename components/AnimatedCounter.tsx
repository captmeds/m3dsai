interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({ 
  target, 
  suffix = "", 
  prefix = "",
  className = "" 
}: AnimatedCounterProps) {
  return (
    <span className={`font-mono font-bold ${className}`}>
      {prefix}{target}{suffix}
    </span>
  );
}
