"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * OG ⇄ Spicy — "Don't chicken out." A controlled pill switch; the hero owns
 * the state and auto-advances it. Per-heat color values live in globals.css
 * under [data-heat], scoped to whichever element carries the attribute.
 */
export type Heat = "og" | "spicy";

/** Pill switch: knob slides from OG to Spicy with a little overshoot. */
export function HeatSwitch({
  value,
  onChange,
  className,
}: {
  value: Heat;
  onChange: (next: Heat) => void;
  className?: string;
}) {
  const on = value === "spicy";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Spicy"
      onClick={() => onChange(on ? "og" : "spicy")}
      className={cn(
        "relative inline-grid h-14 w-[232px] shrink-0 grid-cols-2 items-center rounded-full border-2 border-ink bg-ink p-1 font-sans text-[0.95rem] font-bold uppercase tracking-[0.08em] shadow-stamp transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full border-2 border-ink bg-accent transition-transform duration-500 ease-[cubic-bezier(.3,1.5,.5,1)]",
          on && "translate-x-full",
        )}
      />
      <span className={cn("relative text-center transition-colors duration-300", on ? "text-cream/60" : "text-ink")}>
        OG
      </span>
      <span
        className={cn(
          "relative inline-flex items-center justify-center gap-1 transition-colors duration-300",
          on ? "text-ink" : "text-cream/60",
        )}
      >
        <Flame className="h-4 w-4" aria-hidden="true" />
        Spicy
      </span>
    </button>
  );
}
