import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthorBadgeProps {
  name: string;
  avatarUrl?: string;
  date?: string;
  readTime?: string;
  size?: "sm" | "md" | "lg";
  showMeta?: boolean;
  variant?: "default" | "light";
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AuthorBadge({
  name,
  avatarUrl,
  date,
  readTime,
  size = "md",
  showMeta = true,
  variant = "default",
  className,
}: AuthorBadgeProps) {
  const sizes = {
    sm: {
      avatar: "w-8 h-8 text-xs",
      name: "text-sm",
      meta: "text-xs",
    },
    md: {
      avatar: "w-10 h-10 text-sm",
      name: "text-sm",
      meta: "text-xs",
    },
    lg: {
      avatar: "w-12 h-12 text-base",
      name: "text-base",
      meta: "text-sm",
    },
  };

  const variants = {
    default: {
      name: "text-brown-800",
      meta: "text-brown-500",
      avatar: "bg-brown-200 text-brown-700",
    },
    light: {
      name: "text-cream-50",
      meta: "text-cream-100/80",
      avatar: "bg-cream-50/20 text-cream-50 backdrop-blur-sm",
    },
  };

  const s = sizes[size];
  const v = variants[variant];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {avatarUrl ? (
        <div className={cn("relative rounded-full overflow-hidden", s.avatar)}>
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-semibold",
            s.avatar,
            v.avatar
          )}
        >
          {getInitials(name)}
        </div>
      )}
      <div className="flex flex-col">
        <span className={cn("font-medium", s.name, v.name)}>{name}</span>
        {showMeta && (date || readTime) && (
          <span className={cn("flex items-center gap-2", s.meta, v.meta)}>
            {date && <span>{formatDate(date)}</span>}
            {date && readTime && <span>·</span>}
            {readTime && <span>{readTime}</span>}
          </span>
        )}
      </div>
    </div>
  );
}
