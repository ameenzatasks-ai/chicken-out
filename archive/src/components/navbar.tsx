"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const reduce = useSafeReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-base ease-standard",
        scrolled
          ? "border-b border-hairline bg-charcoal/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-charcoal/80 to-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-co flex h-[72px] items-center justify-between"
      >
        {/* Text wordmark — no logo image. */}
        <a
          href="#home"
          className="font-display text-[1.6rem] uppercase leading-none tracking-tight text-cream"
        >
          Chicken<span className="text-gold">Out</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative block px-2 py-1 text-caption font-bold uppercase tracking-wide transition-colors duration-fast ease-standard",
                    isActive ? "text-gold" : "text-cream-muted hover:text-cream",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-gold"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 320, damping: 24 }
                      }
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <Button
            as="a"
            href={site.contact.phoneHref}
            variant="accent"
            size="sm"
            className="hidden rounded-pill uppercase sm:inline-flex"
          >
            Order Now
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-sm text-cream transition-colors duration-fast hover:bg-graphite lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-hairline bg-charcoal/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-co flex flex-col py-2">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between px-2 py-2 text-title font-bold uppercase transition-colors duration-fast",
                        isActive
                          ? "text-gold"
                          : "text-cream-muted hover:text-cream",
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-gold" />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="px-2 pb-1 pt-2 sm:hidden">
                <Button
                  as="a"
                  href={site.contact.phoneHref}
                  variant="accent"
                  className="w-full rounded-pill uppercase"
                  onClick={() => setOpen(false)}
                >
                  Order Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
