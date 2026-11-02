"use client";

import { content } from "@/lib/content";
import { useHeat } from "@/components/heat";

/** Scrolling slogan band, lines lifted from the brand's Instagram posts. Swaps to heat slogans in spicy mode. */
export function Ribbon() {
  const { heat } = useHeat();
  const words = content.ribbon[heat];
  const run = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="text-stamp-sm whitespace-nowrap px-6 font-display text-[2rem] uppercase md:text-[2.5rem]">{w}</span>
          <span className="text-[1.5rem] text-cream" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Chicken Out slogans" className="overflow-hidden bg-paper pb-10 pt-2">
      {/* Tilted band, over-wide so its rotated ends never show a gap. */}
      <div className="-mx-6 -rotate-[1.5deg] border-y-[3px] border-ink bg-brand py-3">
        <div className="flex w-max animate-marquee">
          {run(false)}
          {run(true)}
        </div>
      </div>
    </section>
  );
}
