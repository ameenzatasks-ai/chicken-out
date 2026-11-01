import { content } from "@/lib/content";
import { ImageSlot, TextSlot } from "@/components/ui/slot";

/**
 * Two-up promo banners under the hero (reference: lead 36px, accent 48px —
 * yellow on the dark banner, blue on the light one — sub copy, white pill CTA,
 * product cutout). All copy/images come from content.banners.
 */
export function BannerStrip() {
  return (
    <section aria-label="Featured banners" className="grid md:grid-cols-2">
      {content.banners.map((b, bi) => (
        <div
          key={bi}
          className={
            b.dark
              ? "relative overflow-hidden bg-ink text-white"
              : "relative overflow-hidden bg-paper-tint text-ink"
          }
        >
          <div className="relative flex min-h-[436px] items-center justify-between gap-2 px-6 py-8 md:px-10">
            <div className="max-w-[55%]">
              <p className="font-heading text-banner-lead uppercase">
                <TextSlot value={b.lead} label="Lead line" onDark={b.dark} className="" />
              </p>
              <p className={`mt-1 font-heading text-banner-accent uppercase ${b.accentClass}`}>
                {b.accentLines.map((line, i) => (
                  <TextSlot
                    key={i}
                    value={line}
                    label={`Accent line ${i + 1}`}
                    onDark={b.dark}
                    className="block"
                  />
                ))}
              </p>
              <p className={`mt-3 font-sans text-body ${b.dark ? "text-white/85" : "text-ink-soft"}`}>
                {b.subLines.map((line, i) => (
                  <TextSlot
                    key={i}
                    value={line}
                    label={`Sub line ${i + 1}`}
                    onDark={b.dark}
                    className="block"
                  />
                ))}
              </p>
              <a href={b.ctaHref} className="btn-pill mt-5">
                <TextSlot value={b.ctaLabel} label="CTA" className="" />
              </a>
            </div>

            <div className="relative aspect-square w-[42%] max-w-[300px]">
              <ImageSlot
                src={b.imageSrc}
                alt={b.imageAlt}
                label="Product cutout PNG"
                sizes="(max-width: 768px) 42vw, 300px"
                className={b.imageSrc ? "object-contain" : ""}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
