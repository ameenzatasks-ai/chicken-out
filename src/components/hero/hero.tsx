"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { BucketStack, PriceSticker } from "@/components/ui/brand";
import { HeatSwitch, useHeat, type Heat } from "@/components/heat";
import { cn } from "@/lib/cn";

const HEATS: Heat[] = ["og", "spicy"];

// Fixed ember field (no Math.random, so server and client agree).
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: ((i * 0.53) % 3.6).toFixed(2),
  size: 4 + ((i * 7) % 6),
  dx: ((i * 29) % 60) - 30,
  dur: (3 + (i % 4) * 0.6).toFixed(1),
}));

const CRUMBS = [
  { src: "/images/hero/crumb-1.png", w: 69, h: 78, cls: "left-[6%] top-[12%] w-[9%]" },
  { src: "/images/hero/crumb-3.png", w: 63, h: 81, cls: "right-[4%] top-[24%] w-[8%]" },
  { src: "/images/hero/crumb-2.png", w: 87, h: 84, cls: "bottom-[8%] left-[18%] w-[10%]" },
  { src: "/images/hero/crumb-4.png", w: 84, h: 51, cls: "bottom-[16%] right-[10%] w-[10%]" },
];

/**
 * Reference-template hero (giant condensed headline, script eyebrow, CTA
 * pair, product art, round price badge) on the brand's red tile wall. The
 * OG ⇄ Spicy switch picks which of the two heroes shows; spicy mode adds a
 * heat glow and rising embers.
 */
export function Hero() {
  const { heat } = useHeat();
  const spicy = heat === "spicy";

  return (
    <section id="top" aria-label="Featured" className="bg-tiles relative overflow-hidden text-white">
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
          <HeatSwitch size="lg" />
          <p className="font-script text-[1.7rem] leading-none text-cream [text-shadow:2px_2px_0_#140C0A]">
            {content.hero.switchLabel[heat]}
          </p>
        </div>

        <div className="grid">
          {HEATS.map((key) => {
            const s = content.hero.modes[key];
            const active = key === heat;
            return (
              <div
                key={key}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-6 pb-16 pt-6 transition-[opacity,visibility] duration-500 md:pb-20 lg:min-h-[580px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:pt-2",
                  active ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                {/* Copy */}
                <div
                  className={cn(
                    "relative z-10 transition-transform duration-500 ease-out",
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
                    <a href="#menu" className="btn btn-light">
                      {s.menuCta}
                    </a>
                  </div>
                </div>

                {/* Art */}
                <div
                  className={cn(
                    "relative mx-auto w-full max-w-[420px] transition-[transform,opacity] duration-500 ease-out lg:max-w-[460px]",
                    active ? "translate-x-0 scale-100" : "translate-x-10 scale-95",
                  )}
                >
                  {key === "og" ? (
                    <BucketStack priority className="mx-auto w-[78%]" />
                  ) : (
                    <div className="relative mx-auto aspect-square w-full">
                      <div className="absolute inset-[8%] rounded-full border-[3px] border-ink bg-accent shadow-stamp-lg" />
                      <Image
                        src="/images/hero/piece-thigh.png"
                        alt="A piece of crispy spicy fried chicken"
                        width={374}
                        height={304}
                        sizes="(max-width: 1024px) 80vw, 460px"
                        className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 -rotate-12 drop-shadow-[0_24px_24px_rgba(0,0,0,.45)]"
                      />
                      {CRUMBS.map((c) => (
                        <Image
                          key={c.src}
                          src={c.src}
                          alt=""
                          aria-hidden="true"
                          width={c.w}
                          height={c.h}
                          className={cn("absolute animate-bob", c.cls)}
                        />
                      ))}
                    </div>
                  )}

                  <PriceSticker
                    top={s.sticker.top}
                    price={s.sticker.price}
                    hot={key === "spicy"}
                    className={cn(
                      "absolute",
                      key === "og"
                        ? "right-0 top-[4%] rotate-[10deg] sm:right-[2%]"
                        : "bottom-[2%] right-[4%] -rotate-6",
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
