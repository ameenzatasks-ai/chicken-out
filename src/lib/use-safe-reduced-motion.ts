"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SSR-safe wrapper around framer's useReducedMotion.
 *
 * framer seeds `useState(prefersReducedMotion.current)` by reading the media
 * query during the *first client render*, while SSR yields null. Branching DOM
 * structure on the raw hook therefore hydration-mismatches for exactly the
 * users who turned Reduce Motion on. Gating on mount makes the first client
 * render agree with the server, then settles to the real preference.
 */
export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && reduce === true;
}
