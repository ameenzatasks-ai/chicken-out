import Image from "next/image";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { BtnArrow } from "@/components/ui/brand";
import { cn } from "@/lib/cn";

/**
 * Reference two-up promo banners: copy left, product cut-out bleeding off
 * the corner. One lit in deep brand red, one frosted glass.
 */
export function Offers() {
  return (
    <section aria-label="Menu highlights" className="bg-night py-16 md:py-20">
      <div className="container-co grid gap-5 md:grid-cols-2">
        {content.offers.map((o, i) => {
          const lit = i === 0;
          return (
            <article
              key={o.title}
              className={cn(
                "relative isolate min-h-[330px] overflow-hidden rounded-[2rem] p-8 md:p-10",
                lit ? "ring-1 ring-white/10" : "glass",
              )}
              style={
                lit
                  ? {
                      background:
                        "radial-gradient(90% 90% at 85% 90%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 60%), linear-gradient(135deg, var(--brand), color-mix(in srgb, var(--brand) 40%, #000))",
                    }
                  : undefined
              }
            >
              <div className="relative z-10 max-w-[60%]">
                <p className="eyebrow-script text-accent">{o.script}</p>
                <h3 className="mt-2 text-h3 text-white">{o.title}</h3>
                <ul className={cn("mt-4 space-y-1 text-small", lit ? "text-white/80" : "text-cream/65")}>
                  {o.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <a
                  href={site.order.foodpanda}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("btn mt-7", lit ? "btn-glass" : "btn-red")}
                >
                  {o.cta}
                  <BtnArrow external />
                </a>
              </div>
              <Image
                src={o.art}
                alt={o.artAlt}
                width={o.artSize[0]}
                height={o.artSize[1]}
                sizes="(max-width: 768px) 55vw, 320px"
                className={cn(
                  "absolute drop-shadow-[0_30px_30px_rgba(0,0,0,.55)]",
                  lit
                    ? "-bottom-16 -right-10 w-[40%] max-w-[230px] rotate-[10deg]"
                    : "-bottom-10 -right-6 w-[42%] max-w-[250px] -rotate-12",
                )}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
