import { cn } from "@/lib/utils";

interface GradientBlurProps {
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

const VARIANT_COLORS = {
  primary: "bg-primary/30",
  secondary: "bg-secondary/30",
  accent: "bg-accent/20",
};

export function GradientBlur({ className, variant = "primary" }: GradientBlurProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px]",
        VARIANT_COLORS[variant],
        className
      )}
    />
  );
}
