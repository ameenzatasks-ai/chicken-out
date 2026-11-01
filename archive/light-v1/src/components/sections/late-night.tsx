import Image from "next/image";
import { Clock, MapPin, ShoppingBag } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { OpenStatus } from "@/components/open-status";

/**
 * Reference "today's special" band: full-bleed photo under a dark scrim,
 * huge headline, CTA pair. Here it carries the late opening hours.
 */
export function LateNight() {
  const c = content.lateNight;
  return (
    <section aria-labelledby="late-night-title" className="relative overflow-hidden bg-ink text-white">
      <Image src={c.bg} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover opacity-45" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />

      <div className="container-co relative grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow-script -rotate-2 text-accent">{c.script}</p>
          <h2 id="late-night-title" className="mt-2 text-hero">
            <span className="block text-cream">{c.title[0]}</span>
            <span className="text-stamp block">{c.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lead text-cream/90">{c.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.order.foodpanda} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Order now
            </a>
            <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get directions
            </a>
          </div>
        </div>

        {/* Hours ticket */}
        <div className="mx-auto w-full max-w-[380px] rotate-2 rounded-3xl border-[3px] border-ink bg-cream p-7 text-ink shadow-[8px_8px_0_0_var(--brand)]">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="font-display text-[1.6rem] uppercase leading-none">Opening hours</p>
          </div>
          <dl className="mt-6 border-t-2 border-dashed border-ink/25 pt-5">
            <dt className="text-label font-bold uppercase text-ink-muted">{site.hours.days}</dt>
            <dd className="mt-1 font-display text-[2.4rem] leading-none text-brand">{site.hours.time}</dd>
          </dl>
          <OpenStatus className="mt-5 w-fit rounded-full bg-ink px-3.5 py-1.5 text-[0.8125rem] font-bold text-cream" />
          <p className="mt-5 flex items-start gap-2 text-small text-ink-soft">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {site.address.full}
          </p>
        </div>
      </div>
    </section>
  );
}
