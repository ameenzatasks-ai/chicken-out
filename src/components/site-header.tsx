"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Menu as MenuIcon, X } from "lucide-react";
import { InstagramIcon } from "@/components/brand-icons";
import { HeatSwitch } from "@/components/heat";
import { OpenStatus } from "@/components/open-status";
import { BtnArrow } from "@/components/ui/brand";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Slim info bar, then a frosted dark bar: logo left, nav centred, heat
 * switch + red order CTA right. The bar sticks and firms up once scrolled.
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
      <div className="border-b border-white/[0.06] bg-night-deep text-cream/75">
        <div className="container-co flex h-9 items-center justify-between gap-4 text-[0.8125rem]">
          <div className="flex min-w-0 items-center gap-6">
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
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{site.social.instagramHandle}</span>
          </a>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
          scrolled || open ? "border-white/10 bg-night/85" : "border-transparent bg-night/40",
        )}
      >
        <div className="container-co flex h-[72px] items-center justify-between gap-6 md:h-20">
          <a href="#top" aria-label={`${site.name} — home`} className="block shrink-0">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={447}
              height={447}
              priority
              className="h-12 w-12 rounded-xl ring-1 ring-white/15 md:h-14 md:w-14"
            />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-2 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-cream/85 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform hover:text-white hover:after:scale-x-100"
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
              className="btn btn-red hidden !h-10 !px-5 sm:inline-flex"
            >
              Order now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass grid h-10 w-10 place-items-center rounded-full text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MenuIcon className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-[max-height] duration-300 lg:hidden",
            open ? "max-h-[420px]" : "max-h-0",
          )}
        >
          <ul className="container-co flex flex-col border-t border-white/10 pb-5 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block border-b border-white/[0.06] py-3 text-[1.75rem] text-white"
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
                Order on foodpanda
                <BtnArrow external />
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
