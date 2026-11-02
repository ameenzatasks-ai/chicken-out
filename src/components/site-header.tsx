"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { InstagramIcon } from "@/components/brand-icons";
import { HeatSwitch } from "@/components/heat";
import { OpenStatus } from "@/components/open-status";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Reference-template header: slim info bar, then a white bar with the logo
 * left, nav centred, red order CTA right. The white bar sticks and gains a
 * hard bottom edge once the page scrolls.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Info bar */}
      <div className="bg-ink text-cream">
        <div className="container-co flex h-10 items-center justify-between gap-4 text-[0.8125rem] font-medium">
          <div className="flex min-w-0 items-center gap-5">
            <OpenStatus />
            <span className="hidden items-center gap-1.5 truncate md:flex">
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {site.address.venue}, {site.address.street}
            </span>
          </div>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-accent"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{site.social.instagramHandle}</span>
          </a>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-paper transition-shadow duration-200",
          scrolled || open ? "shadow-[0_2px_0_0_#140C0A]" : "shadow-none",
        )}
      >
        <div className="container-co flex h-[76px] items-center justify-between gap-6 md:h-[88px]">
          <a href="#top" aria-label={`${site.name} — home`} className="block shrink-0">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={447}
              height={447}
              priority
              className="h-14 w-14 rounded-lg border-2 border-ink shadow-stamp md:h-16 md:w-16"
            />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative font-sans text-[1rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:text-brand hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <HeatSwitch size="sm" />
            <a
              href={site.order.foodpanda}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red hidden !px-5 !py-2.5 sm:inline-flex"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Order now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-accent text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MenuIcon className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden bg-paper transition-[max-height] duration-300 lg:hidden",
            open ? "max-h-[420px]" : "max-h-0",
          )}
        >
          <ul className="container-co flex flex-col border-t-2 border-ink pb-5 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-paper-line py-3 font-display text-[1.75rem] uppercase text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <a
                href={site.order.foodpanda}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red w-full"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Order on foodpanda
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
