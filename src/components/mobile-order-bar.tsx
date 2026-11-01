"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { OpenStatus } from "@/components/open-status";
import { BtnArrow } from "@/components/ui/brand";
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
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/80 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden",
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
          className="btn btn-glass !h-11 !w-11 shrink-0 !px-0"
        >
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={site.order.foodpanda}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-red !h-11 shrink-0 !px-5"
        >
          Order now
          <BtnArrow external />
        </a>
      </div>
    </nav>
  );
}
