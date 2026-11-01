import { Quote, Star } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";

/** Real customer reviews from foodpanda, as frosted cards on the dark tile wall. */
export function Testimonials() {
  const c = content.reviews;
  return (
    <section
      id="reviews"
      className="bg-tiles-dark relative overflow-hidden py-20 md:py-28"
      style={{ "--glow-at": "50% 35%" } as React.CSSProperties}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-night to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night to-transparent" />

      <div className="container-co relative">
        <div className="text-center">
          <p className="eyebrow-script text-accent [text-shadow:2px_2px_0_#140C0A]">{c.script}</p>
          <h2 className="mt-2 text-h2 text-cream">
            <span className="text-stamp">{site.rating.value} / 5</span> on {site.rating.source}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1 text-accent" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="mt-2 text-cream/65">From {site.rating.count} customer ratings</p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {c.items.map((r) => (
            <li key={r.name}>
              <figure className="glass relative flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-white/20">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink">
                  <Quote className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                <blockquote className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-cream/90">“{r.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span>
                    <span className="display block text-[1.35rem] leading-none text-white">{r.name}</span>
                    <span className="mt-0.5 block text-[0.8125rem] text-cream/50">via foodpanda</span>
                  </span>
                  {r.badge && (
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-semibold text-white">
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
