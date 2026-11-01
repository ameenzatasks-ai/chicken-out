import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Flame } from "lucide-react";
import { TAKA } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Brand primitives shared across sections: the polaroid frame and the
 * mascot-and-wordmark bucket both come straight from the logo; the price
 * sticker mirrors the round promo badges in the reference designs.
 */

export function Polaroid({
  src,
  alt,
  caption,
  className,
  captionClassName,
  sizes = "(max-width: 768px) 80vw, 420px",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  captionClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("polaroid", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-night">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && (
        <figcaption
          className={cn(
            "absolute inset-x-0 bottom-3 px-4 text-center font-script text-[1.6rem] leading-none text-ink sm:bottom-4",
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PriceSticker({
  top,
  price,
  hot = false,
  className,
}: {
  top?: string;
  price: number | string;
  /** Adds the flame badge used in spicy mode. */
  hot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid h-[100px] w-[100px] place-items-center rounded-full bg-accent text-ink shadow-glow-accent ring-[6px] ring-white/10 sm:h-[116px] sm:w-[116px]",
        className,
      )}
    >
      {hot && (
        <span className="absolute -right-1 -top-1 grid h-9 w-9 place-items-center rounded-full bg-brand text-white ring-4 ring-night">
          <Flame className="h-4 w-4 fill-current" aria-hidden="true" />
        </span>
      )}
      <div className="text-center leading-none">
        {top && <span className="block text-[0.8rem] font-bold uppercase tracking-[0.14em]">{top}</span>}
        <span className="display mt-0.5 block text-[2.1rem] sm:text-[2.5rem]">
          {typeof price === "number" ? `${TAKA}${price}` : price}
        </span>
      </div>
    </div>
  );
}

/** Circle-arrow chip at the end of a button (styles in globals.css). */
export function BtnArrow({ external = false }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span className="btn-arrow" aria-hidden="true">
      <Icon className="h-4 w-4" />
    </span>
  );
}

/**
 * Branded bucket with the chicken heap tucked behind its front lip. Geometry
 * comes from the three cut-outs at a shared 300px width: heap 133px tall at
 * y 0, bucket 302px at y 99, front slice 280px at y 122 (box = 300 x 401).
 */
export function BucketStack({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[300/401]", className)}>
      <Image
        src="/images/hero/bucket.png"
        alt="A Chicken Out bucket piled with crispy fried chicken"
        width={646}
        height={651}
        priority={priority}
        sizes="(max-width: 1024px) 70vw, 460px"
        className="absolute left-0 w-full drop-shadow-[0_40px_40px_rgba(0,0,0,.6)]"
        style={{ top: "24.69%" }}
      />
      <Image
        src="/images/hero/bucket-heap.png"
        alt=""
        aria-hidden="true"
        width={652}
        height={290}
        priority={priority}
        sizes="(max-width: 1024px) 70vw, 460px"
        className="absolute left-0 top-0 w-full"
      />
      <Image
        src="/images/hero/bucket-front.png"
        alt=""
        aria-hidden="true"
        width={646}
        height={602}
        priority={priority}
        sizes="(max-width: 1024px) 70vw, 460px"
        className="absolute left-0 w-full"
        style={{ top: "30.42%" }}
      />
    </div>
  );
}

export function SectionTitle({
  script,
  title,
  className,
  align = "center",
}: {
  script: string;
  title: ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="eyebrow-script text-accent">{script}</p>
      <h2 className="mt-2 text-h2 text-white">{title}</h2>
    </div>
  );
}

export function SpicyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.2 2.6c.5-.4 1.3-.2 1.5.4.2.6 0 1.4-.6 2 1.7.3 3 1.5 3.3 3.2.4 2.4-.6 5.6-2.9 8.4-2.3 2.8-5.4 4.8-8.3 4.8-.8 0-1.3-.9-.8-1.6 1.6-2.2 2.7-4.6 3.1-7.1.4-2.6 1.6-4.6 3.5-5.6-.2-1.8.2-3.6 1.2-4.5Z"
      />
    </svg>
  );
}
