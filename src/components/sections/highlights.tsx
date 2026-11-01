import { Bike, Clock, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Frosted fact tiles along the bottom of the hero (reference template's feature row). */
const items = [
  { icon: Star, title: `${site.rating.value} / 5 rating`, sub: `${site.rating.count} ratings on foodpanda` },
  { icon: Clock, title: "Open late", sub: site.hours.short },
  { icon: MapPin, title: site.address.venue, sub: "Road 16, Bashundhara R/A" },
  { icon: Bike, title: "Delivery & pickup", sub: "Order through foodpanda" },
];

export function Highlights({ className }: { className?: string }) {
  return (
    <ul aria-label="Highlights" className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>
      {items.map(({ icon: Icon, title, sub }) => (
        <li key={title} className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-accent ring-1 ring-white/10">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="display block text-[1.3rem] leading-tight tracking-wide text-white">{title}</span>
            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-cream/60">{sub}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
