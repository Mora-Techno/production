import type { ReactNode } from "react";
import { cn } from "@/utils/classname";

type GhibliEmptyStateProps = {
  emoji?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function GhibliEmptyState({
  emoji = "🍃",
  title,
  description,
  className,
  children,
}: GhibliEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className
      )}
    >
      <span className="animate-[float_3s_ease-in-out_infinite] text-4xl">
        {emoji}
      </span>
      <p className="font-serif text-lg font-medium">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}
