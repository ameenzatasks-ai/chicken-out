"use client";

import { useEffect, useState } from "react";
import { MapPin, ShoppingBag } from "lucide-react";
import { OpenStatus } from "@/components/open-status";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Phone/tablet-only bar pinned to the bottom: live status, directions, order.
 * Slides in once the hero (which has its own CTAs) has scrolled out of view.
 */
export function MobileOrderBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Quick order"
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-ink bg-ink transition-transform duration-300 ease-out lg:hidden",
        show ? "translate-y-0" : "translate-y-[110%]",
      )}
    >
      <div className="container-co flex items-center gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <OpenStatus compact className="min-w-0 flex-1 text-small font-semibold text-cream" />
        <a
          href={site.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-cream/80 text-cream transition-colors hover:border-accent hover:text-accent"
        >
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={site.order.foodpanda}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-yellow shrink-0 !px-5 !py-2.5 !shadow-none"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Order now
        </a>
      </div>
    </nav>
  );
}
