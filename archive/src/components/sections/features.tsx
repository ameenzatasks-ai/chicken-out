"use client";

import { motion } from "framer-motion";
import { Flame, Truck, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Flame,
    title: "Fresh & Crispy",
    body: "Made to order with premium ingredients.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    body: "Hot meals delivered across Bashundhara.",
  },
  {
    icon: Sparkles,
    title: "Value Combos",
    body: "Affordable meals for individuals and families.",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  body,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  delay: number;
}) {
  const reduce = useSafeReducedMotion();

  return (
    <Reveal delay={delay}>
      <motion.article
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="group relative h-full overflow-hidden rounded-xl border border-hairline bg-graphite p-4 shadow-e2 transition-[box-shadow,border-color] duration-fast ease-standard hover:border-gold/30 hover:shadow-e3"
      >
        {/* Radial glow on hover — atmosphere, not a flat colour swap. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base ease-standard group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(22rem 12rem at 50% 0%, rgba(240,168,30,.10), transparent 70%)",
          }}
        />

        <div className="relative">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/10 ring-1 ring-inset ring-gold/20 transition-transform duration-base ease-standard group-hover:-rotate-6 group-hover:scale-105">
            <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
          </span>

          <h3 className="mt-3 text-title text-cream">{title}</h3>
          <p className="mt-1 text-body text-cream-muted">{body}</p>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="section-y">
      <div className="container-co">
        <h2 id="features-heading" className="sr-only">
          Why order from Chicken Out
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
