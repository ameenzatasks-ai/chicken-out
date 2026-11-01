import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/brand-icons";
import { OpenStatus } from "@/components/open-status";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { BtnArrow, SectionTitle } from "@/components/ui/brand";

/** Frosted location + hours card beside a red tile-wall Instagram card. */
export function Visit() {
  const c = content.visit;
  const ig = content.instagram;
  return (
    <section id="visit" className="bg-night py-20 md:py-28">
      <div className="container-co">
        <SectionTitle script={c.script} title={c.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* Location */}
          <div className="glass rounded-[2rem] p-8 md:p-10">
            <OpenStatus className="mb-8 w-fit rounded-full bg-white/[0.07] px-4 py-1.5 text-small font-semibold text-cream ring-1 ring-white/10" />
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="kicker flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Find us
                </dt>
                <dd className="mt-3">
                  <span className="display block text-[2rem] leading-none text-white">
                    {site.address.venue}
                  </span>
                  <span className="mt-2 block text-body text-cream/65">
                    {site.address.street}
                    <br />
                    {site.address.city}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="kicker flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Opening hours
                </dt>
                <dd className="mt-3">
                  <span className="display block text-[2rem] leading-none text-white">
                    {site.hours.days}
                  </span>
                  <span className="mt-2 block text-body text-cream/65">{site.hours.time}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
              <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Get directions
                <BtnArrow external />
              </a>
              <a href={site.order.foodpanda} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                Order on foodpanda
                <BtnArrow external />
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-tiles relative overflow-hidden rounded-[2rem] p-8 text-white ring-1 ring-white/10 md:p-10">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt=""
                aria-hidden="true"
                width={447}
                height={447}
                className="h-16 w-16 rotate-[-4deg] rounded-xl shadow-photo ring-2 ring-white/30"
              />
              <div>
                <p className="eyebrow-script text-accent [text-shadow:2px_2px_0_#140C0A]">{ig.script}</p>
                <p className="display mt-1 text-[1.6rem] leading-none">{site.social.instagramHandle}</p>
              </div>
            </div>
            <p className="display mt-7 text-[2.4rem] leading-[0.95] text-cream">{site.tagline}</p>
            <p className="mt-4 text-body text-white/80">{ig.body}</p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass mt-8"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow on Instagram
              <BtnArrow external />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
