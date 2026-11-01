import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Red as a background with cream text. Red *text* on charcoal is ~4.1:1 and
  // fails AA — see the contrast note in the design skill.
  primary:
    "bg-primary-600 text-cream hover:bg-primary-500 hover:shadow-glow-red hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-cream border border-hairline hover:bg-graphite-lift hover:border-gold",
  // Dark text on gold — required for contrast.
  accent:
    "bg-gold text-charcoal font-bold hover:bg-gold-400 hover:shadow-glow-gold hover:-translate-y-0.5",
  ghost: "bg-transparent text-cream-muted hover:text-cream hover:bg-graphite",
};

const sizes: Record<Size, string> = {
  // 44px, not 40 — `sm` is visible from 640px up, which includes touch tablets,
  // and the design system floors touch targets at 44px.
  sm: "h-11 px-2 text-caption gap-1",
  md: "h-12 px-3 text-body gap-1",
  lg: "h-[56px] px-4 text-body-lg gap-2",
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Tag = (as ?? "button") as ElementType;

  return (
    <Tag
      className={cn(
        "inline-flex select-none items-center justify-center rounded-md font-semibold",
        // Explicit property list — never `transition-all`.
        "transition-[transform,background-color,box-shadow,border-color] duration-fast ease-standard",
        "active:translate-y-0 active:scale-[.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
