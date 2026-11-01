import { Flame, Sparkles } from "lucide-react";
import { content } from "@/lib/content";
import { site } from "@/lib/site";
import { BtnArrow, Polaroid } from "@/components/ui/brand";

/**
 * Reference "About our food" block: framed photos with a round badge on the
 * left, script eyebrow + big headline + two feature points + CTA on the right.
 * The cream polaroids are the only light surfaces here, so they pop off the dark.
 */
export function About() {
  const c = content.about;
  return (
    <section id="about" className="relative overflow-hidden bg-night py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />

      <div className="container-co relative grid items-center gap-16 lg:grid-cols-2 lg:gap-14">
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
          <div className="absolute -left-2 top-6 grid h-[100px] w-[100px] -rotate-12 place-items-center rounded-full bg-brand text-center text-white shadow-glow ring-[6px] ring-white/10 sm:-left-6 sm:h-[112px] sm:w-[112px]">
            <span className="leading-none">
              <span className="display block text-[2.3rem] text-accent">{site.rating.value}★</span>
              <span className="mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.14em]">on foodpanda</span>
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow-script text-accent">{c.script}</p>
          <h2 className="mt-2 text-h2 text-cream">
            {c.titleLines.map((line, i) => (
              <span key={line} className={i === 1 ? "text-stamp block" : "block"}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lead text-cream/70">{c.body}</p>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {c.recipes.map((r, i) => {
              const Icon = i === 0 ? Sparkles : Flame;
              return (
                <li key={r.name} className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        i === 0
                          ? "grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink"
                          : "grid h-10 w-10 place-items-center rounded-xl bg-brand text-white"
                      }
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-h4 text-white">{r.name}</h3>
                  </div>
                  <p className="mt-3 text-small text-cream/65">{r.text}</p>
                </li>
              );
            })}
          </ul>

          <a href="#menu" className="btn btn-glass mt-9">
            Explore the menu
            <BtnArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
