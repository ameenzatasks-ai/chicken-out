"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

/**
 * Scroll reveal. Travel stays subtle (20px) — big entrance distances read
 * cheap. Fires once; re-animating on every scroll-by is a generic tell.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div className="mx-auto max-w-prose text-center">
      <Reveal>
        <p className="text-overline uppercase text-gold">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-1 text-display-lg text-cream">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-2 text-body-lg text-cream-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
