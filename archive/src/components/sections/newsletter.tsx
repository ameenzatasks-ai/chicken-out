"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { TextSlot } from "@/components/ui/slot";

/** Newsletter band — heading, email input, yellow submit. Shell only. */
export function Newsletter() {
  const [done, setDone] = useState(false);
  const c = content.newsletter;

  return (
    <section className="bg-paper py-14">
      <div className="container-co text-center">
        <h2 className="section-h2">
          <TextSlot value={c.heading} label="Section heading" className="" />
        </h2>

        {done ? (
          <p className="mt-6 font-sans text-body text-ink-soft" role="status">
            ✓
          </p>
        ) : (
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={c.emailPlaceholder}
              className="h-12 flex-1 border border-paper-line bg-white px-4 font-sans text-body text-ink placeholder:text-ink-faint"
            />
            <button type="submit" className="btn-accent h-12 px-8">
              <TextSlot value={c.ctaLabel} label="CTA" className="" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
