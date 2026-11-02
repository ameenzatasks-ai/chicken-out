import { Flame, Sparkles } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { Polaroid } from "@/components/ui/brand";

/**
 * Reference "About our food" block: framed photo with a round badge on the
 * left, script eyebrow + big headline + two feature points + CTA on the right.
 */
export function About() {
  const c = content.about;
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="container-co grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Photos */}
        <div className="relative mx-auto w-full max-w-[520px] pb-10 pr-8 sm:pr-16">
          <Polaroid
            src={c.photoMain.src}
            alt={c.photoMain.alt}
            caption={c.caption}
            className="w-[82%] -rotate-[4deg]"
            // The small polaroid overlaps the bottom-right corner.
            captionClassName="text-left text-[1.3rem] sm:px-5 sm:text-[1.6rem]"
          />
          <Polaroid
            src={c.photoSmall.src}
            alt={c.photoSmall.alt}
            className="!absolute -bottom-4 right-0 w-[40%] rotate-[7deg] !pb-10 sm:bottom-0 sm:w-[46%]"
            sizes="(max-width: 768px) 45vw, 240px"
          />
          <div className="absolute -left-2 top-6 grid h-[104px] w-[104px] -rotate-12 place-items-center rounded-full border-[3px] border-ink bg-brand text-center text-white shadow-stamp sm:-left-6 sm:h-[118px] sm:w-[118px]">
            <span className="leading-none">
              <span className="block font-display text-[2.4rem] text-accent">{site.rating.value}★</span>
              <span className="mt-1 block text-[0.7rem] font-bold uppercase tracking-[0.14em]">on foodpanda</span>
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow-script text-brand">{c.script}</p>
          <h2 className="mt-2 text-h2 text-ink">
            {c.titleLines.map((line, i) => (
              <span key={line} className={i === 1 ? "block text-brand" : "block"}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lead text-ink-soft">{c.body}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {c.recipes.map((r, i) => {
              const Icon = i === 0 ? Sparkles : Flame;
              return (
                <li key={r.name} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-stamp">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        i === 0
                          ? "grid h-10 w-10 place-items-center rounded-full bg-accent text-ink"
                          : "grid h-10 w-10 place-items-center rounded-full bg-brand text-white"
                      }
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-h4 text-ink">{r.name}</h3>
                  </div>
                  <p className="mt-3 text-small text-ink-soft">{r.text}</p>
                </li>
              );
            })}
          </ul>

          <a href="#menu" className="btn btn-red mt-9">
            Explore the menu
          </a>
        </div>
      </div>
    </section>
  );
}
