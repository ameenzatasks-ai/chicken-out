"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * OG ⇄ Spicy mode — "Don't chicken out." The choice lives here; the page
 * retints through `data-heat` on <html> (color values in globals.css), and
 * sections read `useHeat()` for copy and menu changes. Not persisted: every
 * visit starts on OG.
 */
export type Heat = "og" | "spicy";

const HeatContext = createContext<{ heat: Heat; toggle: () => void } | null>(null);

export function HeatProvider({ children }: { children: ReactNode }) {
  const [heat, setHeat] = useState<Heat>("og");
  const [announcement, setAnnouncement] = useState("");
  const first = useRef(true);

  useEffect(() => {
    document.documentElement.dataset.heat = heat;
    if (first.current) {
      first.current = false;
      return;
    }
    setAnnouncement(heat === "spicy" ? "Spicy mode on. Showing spicy menu items." : "OG mode on.");
  }, [heat]);

  const toggle = useCallback(() => setHeat((h) => (h === "og" ? "spicy" : "og")), []);

  return (
    <HeatContext.Provider value={{ heat, toggle }}>
      {children}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </HeatContext.Provider>
  );
}

export function useHeat() {
  const ctx = useContext(HeatContext);
  if (!ctx) throw new Error("useHeat must be used inside <HeatProvider>");
  return ctx;
}

/** Pill switch: knob slides from OG to Spicy with a little overshoot. */
export function HeatSwitch({ size = "lg", className }: { size?: "lg" | "sm"; className?: string }) {
  const { heat, toggle } = useHeat();
  const on = heat === "spicy";
  const lg = size === "lg";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Spicy mode"
      onClick={toggle}
      className={cn(
        "relative inline-grid shrink-0 grid-cols-2 items-center rounded-full border-2 border-ink bg-ink p-1 font-sans font-bold uppercase tracking-[0.08em] shadow-stamp transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0",
        lg ? "h-14 w-[232px] text-[0.95rem]" : "h-10 w-[140px] text-[0.75rem]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full border-2 border-ink bg-accent transition-transform duration-300 ease-[cubic-bezier(.3,1.5,.5,1)]",
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
        <Flame className={lg ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
        Spicy
      </span>
    </button>
  );
}
