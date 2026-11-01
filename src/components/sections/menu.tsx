"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Flame } from "lucide-react";
import { content } from "@/lib/content";
import { menu, menuCategories, type MenuCategory, type MenuItem } from "@/lib/menu";
import { price, site } from "@/lib/site";
import { BtnArrow, SectionTitle, SpicyMark } from "@/components/ui/brand";
import { useHeat } from "@/components/heat";
import { cn } from "@/lib/cn";

type Filter = "All" | "Spicy" | MenuCategory;
const FILTERS: Filter[] = ["All", "Spicy", ...menuCategories];

const matches = (f: Filter, m: MenuItem) =>
  f === "All" || (f === "Spicy" ? Boolean(m.spicy) : m.category === f);

/**
 * Reference "Popular Food Items" grid, filtered by the same categories the
 * brand uses on foodpanda, plus a Spicy filter that spicy mode switches to.
 * Cards show a photo only when menu.ts provides one.
 */
export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const { heat } = useHeat();
  const spicyMode = heat === "spicy";
  const items = menu.filter((m) => matches(filter, m));
  const c = content.menu;

  // Flipping the heat switch jumps the menu to match; manual tab picks after
  // that are left alone.
  const lastHeat = useRef(heat);
  useEffect(() => {
    if (lastHeat.current === heat) return;
    lastHeat.current = heat;
    setFilter(heat === "spicy" ? "Spicy" : "All");
  }, [heat]);

  return (
    <section id="menu" className="relative bg-night-raised py-20 md:py-28">
      <div className="container-co">
        <SectionTitle script={c.script} title={c.title} />

        <div role="tablist" aria-label="Menu categories" className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = f === filter;
            const count = menu.filter((m) => matches(f, m)).length;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="menu-grid"
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-5 text-[0.9375rem] font-bold uppercase tracking-[0.08em] transition-[background-color,border-color,color] duration-200",
                  active
                    ? "bg-brand text-white shadow-glow"
                    : "glass text-cream/80 hover:border-white/25 hover:text-white",
                )}
              >
                {f === "Spicy" && <Flame className="mr-1.5 h-4 w-4" aria-hidden="true" />}
                {f}
                <span className={cn("ml-2 text-[0.8rem] tabular-nums", active ? "text-white/70" : "text-cream/40")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <ul id="menu-grid" role="tabpanel" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="glass group relative flex flex-col overflow-hidden rounded-3xl transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow"
            >
              {item.image && (
                <div className="relative aspect-[4/3] bg-night">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="kicker">{item.category}</p>
                    <h3 className="mt-1.5 text-[1.75rem] leading-[1.02] text-white">{item.name}</h3>
                  </div>
                  <div className="relative shrink-0 rounded-2xl bg-accent px-3 py-1.5 text-center text-ink">
                    {spicyMode && item.spicy && (
                      <span className="absolute -right-2.5 -top-3 grid h-7 w-7 place-items-center rounded-full bg-brand text-white ring-4 ring-night-raised">
                        <Flame className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      </span>
                    )}
                    <span className="block text-[0.65rem] font-bold uppercase tracking-[0.14em]">from</span>
                    <span className="display block text-[1.6rem] leading-none">
                      {price(item.price)}
                    </span>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-small text-cream/60">{item.description}</p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.popular && (
                      <span className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent ring-1 ring-white/10">
                        Popular
                      </span>
                    )}
                    {item.spicy && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white">
                        <SpicyMark className="h-3 w-3" />
                        Spicy
                      </span>
                    )}
                  </div>
                  <a
                    href={site.order.foodpanda}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Order ${item.name} on foodpanda`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] pl-3.5 pr-2.5 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-transparent hover:bg-brand"
                  >
                    Order
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4">
          <a href={site.order.foodpanda} target="_blank" rel="noopener noreferrer" className="btn btn-red">
            Order the full menu on foodpanda
            <BtnArrow external />
          </a>
          <p className="text-small text-cream/55">{c.note}</p>
        </div>
      </div>
    </section>
  );
}
