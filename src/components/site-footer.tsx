import Image from "next/image";
import { InstagramIcon } from "@/components/brand-icons";
import { navLinks, site } from "@/lib/site";

/** Darkest band: brand block, explore links, visit info, order links. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-night-deep text-cream">
      <div className="container-co grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={447}
            height={447}
            className="h-20 w-20 rounded-2xl ring-1 ring-white/15"
          />
          <p className="display mt-6 max-w-[24ch] text-[1.6rem] leading-[1.1] text-white">
            {site.tagline.split(". ").map((part, i, all) => (
              <span key={part} className={i === 1 ? "text-stamp-sm" : undefined}>
                {part}
                {i < all.length - 1 ? ". " : ""}
              </span>
            ))}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="kicker">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="display text-[1.4rem] text-cream/85 transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="kicker">Visit</h2>
          <address className="mt-5 not-italic leading-relaxed text-cream/75">
            {site.address.venue}
            <br />
            {site.address.street}
            <br />
            {site.address.city}
          </address>
          <p className="mt-4 text-cream/75">
            {site.hours.days}
            <br />
            {site.hours.time}
          </p>
        </div>

        <div>
          <h2 className="kicker">Order & follow</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={site.order.foodpanda}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cream/75 underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-white"
              >
                Order on foodpanda
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-cream/75 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
                {site.social.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        {/* Extra bottom room below lg so the mobile order bar never covers this. */}
        <div className="container-co flex flex-col items-center justify-between gap-2 pb-24 pt-5 text-small text-cream/55 sm:flex-row lg:pb-5">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Bashundhara, Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
