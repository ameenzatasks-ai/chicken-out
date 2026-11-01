import { content } from "@/lib/content";
import { ImageSlot, TextSlot } from "@/components/ui/slot";

/**
 * "Fresh food FAST" band — full-bleed photo background with dark scrim, white
 * copy + giant headline left, product image right. While bgImageSrc is empty
 * the band uses a plain dark background so the white slots stay readable.
 */
export function FreshFast() {
  const c = content.freshFast;
  return (
    <section id="about" className="relative overflow-hidden bg-ink">
      {c.bgImageSrc && (
        <>
          <ImageSlot src={c.bgImageSrc} alt="" label="" />
          <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
        </>
      )}

      <div className="container-co relative grid min-h-[560px] items-center gap-8 py-12 lg:grid-cols-2">
        <div className="text-white">
          <p className="font-heading text-banner-lead uppercase leading-tight">
            {c.leadLines.map((line, i) => (
              <TextSlot key={i} value={line} label={`Lead line ${i + 1}`} onDark className="block" />
            ))}
          </p>
          <p className="mt-2 font-heading text-giant-fast uppercase text-white">
            <TextSlot value={c.giant} label="Giant word" onDark className="" />
          </p>
          <p className="mt-3 font-sans text-body text-white/90">
            <TextSlot value={c.sub} label="Sub copy" onDark className="" />
          </p>
          <a href={c.ctaHref} className="btn-pill mt-5">
            <TextSlot value={c.ctaLabel} label="CTA" className="" />
          </a>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
          <ImageSlot
            src={c.sideImageSrc}
            alt={c.sideImageAlt}
            label="Product / food image"
            sizes="(max-width: 1024px) 90vw, 560px"
            className={c.sideImageSrc ? "rounded-md shadow-pop" : ""}
          />
        </div>
      </div>
    </section>
  );
}
