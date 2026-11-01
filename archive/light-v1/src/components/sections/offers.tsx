import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Reference two-up promo banners: copy left, product cut-out bleeding off the corner. */
export function Offers() {
  return (
    <section aria-label="Menu highlights" className="bg-paper py-16 md:py-20">
      <div className="container-co grid gap-6 md:grid-cols-2">
        {content.offers.map((o) => {
          const dark = o.tone === "ink";
          return (
            <article
              key={o.title}
              className={cn(
                "relative isolate min-h-[340px] overflow-hidden rounded-[2rem] border-[3px] border-ink p-8 shadow-stamp-lg md:p-10",
                dark ? "bg-ink text-white" : "bg-accent text-ink",
              )}
            >
              {dark && <div aria-hidden="true" className="bg-checker absolute inset-0 -z-10 opacity-[0.14]" />}
              <div className="relative z-10 max-w-[60%]">
                <p className={cn("eyebrow-script", dark ? "text-accent" : "text-brand")}>{o.script}</p>
                <h3 className={cn("mt-2 text-h3", dark && "text-cream")}>{o.title}</h3>
                <ul className={cn("mt-4 space-y-1 text-small font-semibold", dark ? "text-cream/85" : "text-ink-soft")}>
                  {o.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <a
                  href={site.order.foodpanda}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("btn mt-7", dark ? "btn-yellow" : "btn-ink")}
                >
                  {o.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <Image
                src={o.art}
                alt={o.artAlt}
                width={o.artSize[0]}
                height={o.artSize[1]}
                sizes="(max-width: 768px) 55vw, 320px"
                className={cn(
                  "absolute drop-shadow-[0_20px_20px_rgba(0,0,0,.35)]",
                  dark
                    ? "-bottom-6 -right-8 w-[50%] max-w-[300px] -rotate-12"
                    : "-bottom-16 -right-10 w-[40%] max-w-[230px] rotate-[10deg]",
                )}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
