"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { content } from "@/lib/content";
import { MENU_FILTER_EVENT } from "@/lib/menu";
import { site } from "@/lib/site";
import { Polaroid } from "@/components/ui/brand";
import { HeatSwitch, type Heat } from "@/components/heat";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/cn";

const HEATS: Heat[] = ["og", "spicy"];
const INTERVAL_MS = 6000; // keep in step with the `progress` animation in tailwind.config.ts

// Fixed ember field (no Math.random, so server and client agree).
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: ((i * 0.53) % 3.6).toFixed(2),
  size: 4 + ((i * 7) % 6),
  dx: ((i * 29) % 60) - 30,
  dur: (3 + (i % 4) * 0.6).toFixed(1),
}));

// Crumbs scattered around (and over the edge of) the polaroid.
const CRUMBS = [
  { src: "/images/hero/crumb-1.png", w: 69, h: 78, cls: "-left-[2%] top-[4%] w-[9%]" },
  { src: "/images/hero/crumb-3.png", w: 63, h: 81, cls: "-right-[1%] top-[26%] w-[8%] [animation-delay:1.2s]" },
  { src: "/images/hero/crumb-2.png", w: 87, h: 84, cls: "-bottom-[1%] left-[10%] w-[10%] [animation-delay:2.1s]" },
  { src: "/images/hero/crumb-4.png", w: 84, h: 51, cls: "bottom-[6%] -right-[2%] w-[10%] [animation-delay:.6s]" },
];

/**
 * Reference-template hero (giant condensed headline, script eyebrow, CTA
 * pair, product art) on the brand's red tile wall. It slides between the OG
 * and Spicy heroes by itself, every 6s; the switch shows which is up and
 * fills a progress line. Hover/focus pauses it, picking a side with the
 * switch stops it, and reduced-motion users never get autoplay. Spicy
 * retints only this section (data-heat) and adds embers.
 */
export function Hero() {
  const [heat, setHeat] = useState<Heat>("og");
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduce = useSafeReducedMotion();
  const running = !paused && !stopped && !reduce;
  const spicy = heat === "spicy";

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setHeat((h) => (h === "og" ? "spicy" : "og")), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [heat, running]);

  const pick = (next: Heat) => {
    setStopped(true);
    setHeat(next);
  };

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured"
      data-heat={heat}
      className="bg-tiles relative -mt-[76px] overflow-hidden pt-[76px] text-white md:-mt-[84px] md:pt-[84px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <h1 className="sr-only">
        {site.name} — fried chicken at Centrum Food Court, Bashundhara, Dhaka
      </h1>

      {/* Floor shadow so the art sits on something. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
      />

      {/* Heat: glow from below + embers. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          spicy ? "opacity-100" : "opacity-0",
        )}
        style={{ background: "radial-gradient(90% 55% at 62% 108%, rgba(255,116,25,.6), transparent 70%)" }}
      />
      {spicy && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="absolute bottom-0 animate-ember rounded-full bg-[#FFB347] shadow-[0_0_10px_3px_rgba(255,116,25,.7)]"
              style={
                {
                  left: `${e.left}%`,
                  width: e.size,
                  height: e.size,
                  animationDelay: `${e.delay}s`,
                  "--dx": `${e.dx}px`,
                  "--dur": `${e.dur}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className="container-co relative">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-8 md:pt-10">
          <div className="relative">
            <HeatSwitch value={heat} onChange={pick} />
            {/* Progress to the next slide; restarts each slide and on resume. */}
            {running && (
              <span
                key={heat}
                aria-hidden="true"
                className="absolute -bottom-2.5 left-5 right-5 h-1 origin-left animate-progress rounded-full bg-accent"
              />
            )}
          </div>
          <p className="font-script text-[1.7rem] leading-none text-cream [text-shadow:2px_2px_0_#140C0A]">
            {content.hero.switchLabel}
          </p>
        </div>

        <div className="grid" aria-live={running ? "off" : "polite"}>
          {HEATS.map((key) => {
            const s = content.hero.modes[key];
            const active = key === heat;
            return (
              <div
                key={key}
                role="group"
                aria-roledescription="slide"
                aria-label={key === "og" ? "OG" : "Spicy"}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-8 pb-16 pt-6 transition-[opacity,visibility] duration-700 md:pb-20 lg:min-h-[580px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pt-2",
                  active ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                {/* Copy */}
                <div
                  className={cn(
                    "relative z-10 transition-transform duration-700 ease-out",
                    active ? "translate-y-0" : "translate-y-6",
                  )}
                >
                  <p className="eyebrow-script -rotate-3 text-accent [text-shadow:2px_2px_0_#140C0A]">{s.script}</p>
                  <h2 className="mt-2 text-hero">
                    <span className="block text-cream [text-shadow:4px_4px_0_rgba(20,12,10,.35)]">{s.titleTop}</span>
                    <span className="text-stamp block">{s.titleStamp}</span>
                  </h2>
                  <p className="mt-6 max-w-[34ch] text-lead font-medium text-cream/95">{s.body}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={site.order.foodpanda}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-yellow"
                    >
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                      Order now
                    </a>
                    <a
                      href="#menu"
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent(MENU_FILTER_EVENT, { detail: s.menuFilter }))
                      }
                      className="btn btn-light"
                    >
                      {s.menuCta}
                    </a>
                  </div>
                </div>

                {/* Art: the menu photo as a tilted polaroid, crumbs drifting round it. */}
                <div
                  className={cn(
                    "relative mx-auto w-full max-w-[440px] px-3 py-4 transition-[transform,opacity] duration-700 ease-out lg:max-w-[500px]",
                    active ? "translate-x-0 scale-100" : "translate-x-10 scale-95",
                  )}
                >
                  <Polaroid
                    src={s.photo.src}
                    alt={s.photo.alt}
                    caption={s.photo.caption}
                    ratio="aspect-[3/2]"
                    priority={key === "og"}
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className={key === "og" ? "rotate-[3deg]" : "-rotate-[3deg]"}
                  />
                  {CRUMBS.map((c) => (
                    <Image
                      key={c.src}
                      src={c.src}
                      alt=""
                      aria-hidden="true"
                      width={c.w}
                      height={c.h}
                      className={cn("absolute z-10 animate-bob drop-shadow-[0_6px_6px_rgba(0,0,0,.35)]", c.cls)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
