import Image from "next/image";
import { InstagramIcon } from "@/components/brand-icons";
import { navLinks, site } from "@/lib/site";

/** Dark footer: brand block, explore links, visit info, order links. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream">
      <div className="container-co grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={447}
            height={447}
            className="h-24 w-24 rounded-xl border-[3px] border-cream/90"
          />
          <p className="mt-6 max-w-[30ch] font-display text-[1.6rem] uppercase leading-[1.05] text-accent">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-label font-bold text-cream/60">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-display text-[1.4rem] uppercase transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-label font-bold text-cream/60">Visit</h2>
          <address className="mt-5 not-italic leading-relaxed text-cream/90">
            {site.address.venue}
            <br />
            {site.address.street}
            <br />
            {site.address.city}
          </address>
          <p className="mt-4 text-cream/90">
            {site.hours.days}
            <br />
            {site.hours.time}
          </p>
        </div>

        <div>
          <h2 className="font-sans text-label font-bold text-cream/60">Order & follow</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={site.order.foodpanda}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-accent"
              >
                Order on foodpanda
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-accent"
              >
                <InstagramIcon className="h-4 w-4" />
                {site.social.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-checker border-t-[3px] border-ink">
        {/* Extra bottom room below lg so the mobile order bar never covers this. */}
        <div className="container-co flex flex-col items-center justify-between gap-2 pb-24 pt-4 text-small font-medium text-white sm:flex-row lg:pb-4">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Bashundhara, Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
