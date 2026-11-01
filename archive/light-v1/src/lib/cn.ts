import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default font-size scale. Our custom
 * sizes (text-hero, text-h2, text-lead, …) are unknown to it, so it files
 * them under the text-COLOR group and silently drops whatever real color
 * class sits alongside them — e.g. `text-ink text-h2` would lose text-ink.
 * Registering the sizes here keeps color and size in their own groups.
 * Keep this list in sync with theme.extend.fontSize in tailwind.config.ts.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["hero", "h2", "h3", "h4", "script", "lead", "body", "small", "label"],
        },
      ],
      shadow: [{ shadow: ["stamp", "stamp-lg", "photo"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
