import { Quote, Star } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const TILTS = ["-rotate-2", "rotate-1 lg:translate-y-6", "-rotate-1"];

/** Real customer reviews from foodpanda, pinned to the tile wall like notes. */
export function Testimonials() {
  const c = content.reviews;
  return (
    <section id="reviews" className="bg-tiles relative overflow-hidden py-20 text-white md:py-28">
      <div className="container-co">
        <div className="text-center">
          <p className="eyebrow-script -rotate-2 text-accent [text-shadow:2px_2px_0_#140C0A]">{c.script}</p>
          <h2 className="mt-2 text-h2">
            <span className="text-stamp">{site.rating.value} / 5</span>{" "}
            <span className="text-cream">on {site.rating.source}</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1 text-accent" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current stroke-ink" />
            ))}
          </div>
          <p className="mt-2 font-semibold text-cream/90">From {site.rating.count} customer ratings</p>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {c.items.map((r, i) => (
            <li key={r.name} className={cn("transition-transform duration-300 hover:rotate-0", TILTS[i % TILTS.length])}>
              <figure className="relative flex h-full flex-col rounded-2xl border-[3px] border-ink bg-cream p-7 text-ink shadow-stamp-lg">
                <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-accent">
                  <Quote className="h-4 w-4 fill-ink" aria-hidden="true" />
                </span>
                <blockquote className="mt-3 flex-1 text-[1.0625rem] leading-relaxed">“{r.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/20 pt-4">
                  <span>
                    <span className="block font-display text-[1.35rem] uppercase leading-none">{r.name}</span>
                    <span className="mt-1 block text-[0.8rem] font-semibold text-ink-muted">via foodpanda</span>
                  </span>
                  {r.badge && (
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white">
                      {r.badge}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
