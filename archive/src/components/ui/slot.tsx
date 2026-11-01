import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Placeholder-aware content slots. While a content.ts field is empty they
 * render a labeled dashed outline (so the layout previews and you can see what
 * goes where); once filled they render the real styled content.
 */

export function TextSlot({
  value,
  label,
  className,
  as: Tag = "span",
  onDark = false,
}: {
  value: string;
  label: string;
  className?: string;
  as?: "span" | "p" | "h2";
  onDark?: boolean;
}) {
  if (value) return <Tag className={className}>{value}</Tag>;
  return (
    <Tag
      className={cn(
        className,
        "inline-block border-2 border-dashed px-3 py-0.5 font-sans !text-[13px] font-semibold uppercase tracking-wide",
        onDark
          ? "border-white/50 text-white/70"
          : "border-ink-faint text-ink-faint",
      )}
      aria-hidden="true"
    >
      {label}
    </Tag>
  );
}

export function ImageSlot({
  src,
  alt,
  label,
  className,
  sizes,
  fill = true,
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "grid h-full w-full place-items-center border-2 border-dashed border-ink-faint/50 bg-paper-tint",
        fill && "absolute inset-0",
        className,
      )}
      aria-hidden="true"
    >
      <span className="px-3 text-center font-sans text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
        {label}
      </span>
    </div>
  );
}
