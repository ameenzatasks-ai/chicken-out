"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Flame } from "lucide-react";
import { content } from "@/lib/content";
import { MENU_FILTER_EVENT, menu, menuCategories, type MenuCategory, type MenuItem } from "@/lib/menu";
import { price, site } from "@/lib/site";
import { SectionTitle, SpicyMark } from "@/components/ui/brand";
import { cn } from "@/lib/cn";

type Filter = "All" | "Spicy" | MenuCategory;
const FILTERS: Filter[] = ["All", "Spicy", ...menuCategories];

const matches = (f: Filter, m: MenuItem) =>
  f === "All" || (f === "Spicy" ? Boolean(m.spicy) : m.category === f);

/**
 * Reference "Popular Food Items" grid, filtered by the same categories the
 * brand uses on foodpanda, plus a Spicy filter. The hero's menu buttons
 * pre-select a tab ("See the spicy picks" → Spicy). Cards show a photo only
 * when menu.ts provides one.
 */
export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = menu.filter((m) => matches(filter, m));
  const c = content.menu;

  useEffect(() => {
    const onFilter = (e: Event) => {
      const next = (e as CustomEvent<Filter>).detail;
      if (FILTERS.includes(next)) setFilter(next);
    };
    window.addEventListener(MENU_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(MENU_FILTER_EVENT, onFilter);
  }, []);

  return (
    <section id="menu" className="bg-paper py-20 md:py-28">
      <div className="container-co">
        <SectionTitle script={c.script} title={c.title} />

        <div role="tablist" aria-label="Menu categories" className="mt-10 flex flex-wrap justify-center gap-2.5">
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
                  "rounded-full border-2 border-ink px-5 py-2 text-[0.9375rem] font-bold uppercase tracking-[0.08em] transition-[background-color,box-shadow,transform]",
                  active
                    ? "bg-brand text-white shadow-stamp"
                    : "bg-paper text-ink hover:-translate-y-0.5 hover:bg-cream",
                )}
              >
                {f === "Spicy" && <Flame className="-mt-0.5 mr-1 inline h-4 w-4" aria-hidden="true" />}
                {f}
                <span className={cn("ml-2 text-[0.8rem]", active ? "text-accent" : "text-ink-muted")}>{count}</span>
              </button>
            );
          })}
        </div>

        <ul id="menu-grid" role="tabpanel" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-cream transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-stamp-lg"
            >
              {item.image && (
                <div className="relative aspect-[4/3] border-b-2 border-ink bg-ink">
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
                    <p className="text-label font-bold uppercase text-brand">{item.category}</p>
                    <h3 className="mt-1.5 text-[1.75rem] leading-[1.02] text-ink">{item.name}</h3>
                  </div>
                  <div className="relative shrink-0 rotate-3 rounded-xl border-2 border-ink bg-accent px-3 py-1.5 text-center shadow-stamp transition-transform group-hover:rotate-0">
                    <span className="block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink">from</span>
                    <span className="block font-display text-[1.6rem] leading-none text-ink">{price(item.price)}</span>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-small text-ink-soft">{item.description}</p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/20 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.popular && (
                      <span className="rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent">
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
                    className="inline-flex items-center gap-1 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-ink underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand"
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
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="text-small text-ink-muted">{c.note}</p>
        </div>
      </div>
    </section>
  );
}
