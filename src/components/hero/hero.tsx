"use client";

import Image from "next/image";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { BtnArrow, BucketStack, PriceSticker } from "@/components/ui/brand";
import { HeatSwitch, useHeat, type Heat } from "@/components/heat";
import { Highlights } from "@/components/sections/highlights";
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
  { src: "/images/hero/crumb-1.png", w: 69, h: 78, cls: "left-[4%] top-[14%] w-[8%]" },
  { src: "/images/hero/crumb-3.png", w: 63, h: 81, cls: "right-[2%] top-[34%] w-[7%] [animation-delay:1.2s]" },
  { src: "/images/hero/crumb-2.png", w: 87, h: 84, cls: "bottom-[6%] left-[10%] w-[9%] [animation-delay:2.1s]" },
  { src: "/images/hero/crumb-4.png", w: 84, h: 51, cls: "bottom-[14%] right-[8%] w-[9%] [animation-delay:.6s]" },
];

/**
 * Dark hero after the client's reference: the brand's tile wall in a dark
 * room, lit red from behind the product; heavy sentence-case headline with a
 * yellow line; solid + frosted CTAs; frosted fact tiles along the bottom.
 * The OG ⇄ Spicy switch picks which product shows; spicy adds embers.
 * The header (sticky, translucent) floats over the top of this section.
 */
export function Hero() {
  const { heat } = useHeat();
  const spicy = heat === "spicy";

  return (
    <section
      id="top"
      aria-label="Featured"
      className="bg-tiles-dark relative -mt-[72px] overflow-hidden pt-[72px] text-white md:-mt-20 md:pt-20"
    >
      <h1 className="sr-only">
        {site.name} — fried chicken at Centrum Food Court, Bashundhara, Dhaka
      </h1>

      {/* Vignette into the page below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent"
      />

      {/* Spicy: hotter glow from below + embers. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          spicy ? "opacity-100" : "opacity-0",
        )}
        style={{ background: "radial-gradient(70% 50% at 65% 100%, rgba(255,116,25,.45), transparent 70%)" }}
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
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-8 md:pt-12">
          <HeatSwitch size="lg" />
          <p className="font-script text-[1.6rem] leading-none text-cream/85">{content.hero.switchLabel[heat]}</p>
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
                  "col-start-1 row-start-1 grid items-center gap-8 pb-10 pt-8 transition-[opacity,visibility] duration-500 lg:min-h-[520px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:pt-4",
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
                    <span className="block text-cream [text-shadow:4px_4px_0_rgba(20,12,10,.45)]">{s.titleTop}</span>
                    <span className="text-stamp block">{s.titleStamp}</span>
                  </h2>
                  <p className="mt-6 max-w-[38ch] text-lead text-cream/75">{s.body}</p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <a
                      href={site.order.foodpanda}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-red"
                    >
                      Order now
                      <BtnArrow external />
                    </a>
                    <a href="#menu" className="btn btn-glass">
                      {s.menuCta}
                      <BtnArrow />
                    </a>
                  </div>
                </div>

                {/* Art */}
                <div
                  className={cn(
                    "relative mx-auto w-full max-w-[400px] transition-[transform,opacity] duration-500 ease-out lg:max-w-[460px]",
                    active ? "translate-x-0 scale-100" : "translate-x-10 scale-95",
                  )}
                >
                  {key === "og" ? (
                    <div className="relative">
                      <BucketStack priority className="mx-auto w-[78%]" />
                      {CRUMBS.map((c) => (
                        <Image
                          key={c.src}
                          src={c.src}
                          alt=""
                          aria-hidden="true"
                          width={c.w}
                          height={c.h}
                          className={cn("absolute animate-bob opacity-90", c.cls)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="relative mx-auto aspect-square w-full">
                      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_40%_35%,var(--accent),var(--brand)_75%)] opacity-90 shadow-glow-accent ring-1 ring-white/15" />
                      <Image
                        src="/images/hero/piece-thigh.png"
                        alt="A piece of crispy spicy fried chicken"
                        width={374}
                        height={304}
                        sizes="(max-width: 1024px) 80vw, 460px"
                        className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 -rotate-12 drop-shadow-[0_30px_30px_rgba(0,0,0,.6)]"
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
                      key === "og" ? "right-0 top-[2%] rotate-[8deg] sm:right-[2%]" : "bottom-[4%] right-[4%] -rotate-6",
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Highlights className="relative pb-12 md:pb-16" />
      </div>
    </section>
  );
}
