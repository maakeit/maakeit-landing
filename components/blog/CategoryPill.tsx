import { cn } from "@/lib/utils";

interface CategoryPillProps {
  category: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Marketing": { bg: "bg-amber-100", text: "text-amber-800" },
  "Creator Tips": { bg: "bg-gold-400/20", text: "text-brown-700" },
  "Brand Strategy": { bg: "bg-brown-200", text: "text-brown-800" },
  "Social Media": { bg: "bg-cream-400", text: "text-brown-700" },
  "Collaboration": { bg: "bg-brown-100", text: "text-brown-600" },
  "Growth": { bg: "bg-gold-400/30", text: "text-brown-800" },
  "default": { bg: "bg-brown-100", text: "text-brown-600" },
};

export function CategoryPill({ 
  category, 
  variant = "default", 
  size = "sm",
  className 
}: CategoryPillProps) {
  const colors = categoryColors[category] || categoryColors.default;
  
  const variants = {
    default: `${colors.bg} ${colors.text}`,
    light: "bg-cream-50/90 text-brown-700 backdrop-blur-sm",
    dark: "bg-brown-800 text-cream-50",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {category}
    </span>
  );
}
