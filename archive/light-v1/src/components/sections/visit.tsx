import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, ShoppingBag } from "lucide-react";
import { InstagramIcon } from "@/components/brand-icons";
import { OpenStatus } from "@/components/open-status";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionTitle } from "@/components/ui/brand";

/** Location + hours card beside an Instagram follow card. */
export function Visit() {
  const c = content.visit;
  const ig = content.instagram;
  return (
    <section id="visit" className="bg-cream py-20 md:py-28">
      <div className="container-co">
        <SectionTitle script={c.script} title={c.title} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          {/* Location */}
          <div className="rounded-[2rem] border-[3px] border-ink bg-paper p-8 shadow-stamp-lg md:p-10">
            <OpenStatus className="mb-8 w-fit rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-small font-bold" />
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2 text-label font-bold uppercase text-brand">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Find us
                </dt>
                <dd className="mt-3">
                  <span className="block font-display text-[2rem] uppercase leading-none">{site.address.venue}</span>
                  <span className="mt-2 block text-body text-ink-soft">
                    {site.address.street}
                    <br />
                    {site.address.city}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-label font-bold uppercase text-brand">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Opening hours
                </dt>
                <dd className="mt-3">
                  <span className="block font-display text-[2rem] uppercase leading-none">{site.hours.days}</span>
                  <span className="mt-2 block text-body text-ink-soft">{site.hours.time}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3 border-t-2 border-dashed border-ink/20 pt-8">
              <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
              <a href={site.order.foodpanda} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Order on foodpanda
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-tiles relative overflow-hidden rounded-[2rem] border-[3px] border-ink p-8 text-white shadow-stamp-lg md:p-10">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt=""
                aria-hidden="true"
                width={447}
                height={447}
                className="h-16 w-16 rotate-[-4deg] rounded-xl border-[3px] border-ink"
              />
              <div>
                <p className="eyebrow-script text-accent [text-shadow:2px_2px_0_#140C0A]">{ig.script}</p>
                <p className="mt-1 font-display text-[1.6rem] leading-none">{site.social.instagramHandle}</p>
              </div>
            </div>
            <p className="mt-6 font-display text-[2.4rem] uppercase leading-[0.95] text-cream">{site.tagline}</p>
            <p className="mt-4 text-body text-cream/90">{ig.body}</p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light mt-8"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow on Instagram
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
