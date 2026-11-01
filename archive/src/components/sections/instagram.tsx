import { InstagramIcon } from "@/components/brand-icons";
import { content } from "@/lib/content";
import { TextSlot } from "@/components/ui/slot";

/** Instagram feed shell — 6-across placeholder tiles the real embed replaces. */
const TILES = 6;

export function InstagramFeed() {
  const c = content.instagram;
  return (
    <section id="social" className="bg-paper py-14">
      <div className="container-co text-center">
        <p className="section-eyebrow">
          <TextSlot value={c.eyebrow} label="Eyebrow" className="" />
        </p>
        <h2 className="section-h2 mt-1">
          <TextSlot value={c.heading} label="Section heading" className="" />
        </h2>
        <p className="mt-2 font-sans text-body text-ink-soft">
          <TextSlot value={c.sub} label="Sub copy" className="" />
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: TILES }).map((_, i) => (
            <div
              key={i}
              className="grid aspect-square place-items-center border border-paper-line bg-paper-tint"
              aria-label="Instagram post placeholder"
            >
              <InstagramIcon className="h-8 w-8 text-ink-faint" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="btn-pill-brand">
            <TextSlot value={c.loadMoreLabel} label="Button" onDark className="" />
          </button>
          <a href={c.followHref} className="btn-pill-brand inline-flex items-center gap-2">
            <InstagramIcon className="h-4 w-4" />
            <TextSlot value={c.followLabel} label="Button" onDark className="" />
          </a>
        </div>
      </div>
    </section>
  );
}
