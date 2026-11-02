import { Bike, Clock, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";

/** Yellow fact strip under the hero — the template's "features" row. */
const items = [
  { icon: Star, title: `${site.rating.value} / 5 rating`, sub: `${site.rating.count} ratings on foodpanda` },
  { icon: Clock, title: "Open late", sub: site.hours.short },
  { icon: MapPin, title: site.address.venue, sub: "Road 16, Bashundhara R/A" },
  { icon: Bike, title: "Delivery & pickup", sub: "Order through foodpanda" },
];

export function Highlights() {
  return (
    <section aria-label="Highlights" className="border-y-[3px] border-ink bg-accent">
      <ul className="container-co grid grid-cols-1 divide-y-2 divide-ink/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, sub }) => (
          <li key={title} className="flex items-center gap-4 py-5 lg:py-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-brand">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-[1.35rem] uppercase leading-tight tracking-wide text-ink">{title}</span>
              <span className="block text-small font-medium text-ink-soft">{sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
