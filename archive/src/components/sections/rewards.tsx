import { content } from "@/lib/content";
import { TextSlot } from "@/components/ui/slot";

/** Rewards band — eyebrow, heading, blue pill CTA, small note. */
export function Rewards() {
  const c = content.rewards;
  return (
    <section id="rewards" className="bg-paper py-14">
      <div className="container-co text-center">
        <p className="section-eyebrow">
          <TextSlot value={c.eyebrow} label="Eyebrow" className="" />
        </p>
        <h2 className="section-h2 mt-1">
          <TextSlot value={c.heading} label="Section heading" className="" />
        </h2>
        <a href={c.ctaHref} className="btn-pill-brand mt-6 uppercase">
          <TextSlot value={c.ctaLabel} label="CTA" onDark className="" />
        </a>
        <p className="mt-6 font-sans text-small text-ink-faint">
          <TextSlot value={c.note} label="Small note" className="" />
        </p>
      </div>
    </section>
  );
}
