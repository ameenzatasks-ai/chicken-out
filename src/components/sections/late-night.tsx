import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { OpenStatus } from "@/components/open-status";
import { BtnArrow } from "@/components/ui/brand";

/**
 * Reference "today's special" band: full-bleed photo under a dark scrim,
 * huge headline, CTA pair, frosted hours card. Carries the late opening hours.
 */
export function LateNight() {
  const c = content.lateNight;
  return (
    <section aria-labelledby="late-night-title" className="relative overflow-hidden bg-night text-white">
      <Image src={c.bg} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night via-night/75 to-night/15" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night-raised to-transparent" />

      <div className="container-co relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow-script text-accent">{c.script}</p>
          <h2 id="late-night-title" className="mt-2 text-hero">
            <span className="block text-cream">{c.title[0]}</span>
            <span className="text-stamp block">{c.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lead text-cream/75">{c.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={site.order.foodpanda} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              Order now
              <BtnArrow external />
            </a>
            <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
              Get directions
              <BtnArrow external />
            </a>
          </div>
        </div>

        {/* Hours card */}
        <div className="glass mx-auto w-full max-w-[380px] rounded-3xl p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="display text-[1.6rem] leading-none">Opening hours</p>
          </div>
          <dl className="mt-6 border-t border-white/10 pt-5">
            <dt className="kicker">{site.hours.days}</dt>
            <dd className="display mt-2 text-[2.4rem] leading-none text-white">
              {site.hours.time}
            </dd>
          </dl>
          <OpenStatus className="mt-5 w-fit rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[0.8125rem] font-semibold text-cream ring-1 ring-white/10" />
          <p className="mt-5 flex items-start gap-2 text-small text-cream/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {site.address.full}
          </p>
        </div>
      </div>
    </section>
  );
}
