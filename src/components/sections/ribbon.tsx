"use client";

import { content } from "@/lib/content";
import { useHeat } from "@/components/heat";

/**
 * Scrolling slogan band, lines lifted from the brand's Instagram posts.
 * Deep brand red (brand mixed toward black) so it glows rather than shouts;
 * swaps to heat slogans in spicy mode.
 */
export function Ribbon() {
  const { heat } = useHeat();
  const words = content.ribbon[heat];
  const run = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="text-stamp-sm display whitespace-nowrap px-6 text-[2rem] md:text-[2.5rem]">
            {w}
          </span>
          <span className="text-[1.1rem] text-white/35" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Chicken Out slogans" className="overflow-hidden bg-night-raised pb-14 pt-4">
      {/* Tilted band, over-wide so its rotated ends never show a gap. */}
      <div
        className="-mx-6 -rotate-[1.5deg] border-y border-white/10 py-3.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--brand) 62%, #000), color-mix(in srgb, var(--brand) 42%, #000))",
        }}
      >
        <div className="flex w-max animate-marquee">
          {run(false)}
          {run(true)}
        </div>
      </div>
    </section>
  );
}
