---
name: frontend-design
description: Chicken Out design system — dark edition. Restaurant-template structure (YouTube short ZYqRlWiiFjQ), dark warm skin with glass buttons after the client's KFC-concept reference, Anton/Barlow/Yellowtail fonts (never change), brand colors and voice from the logo + Instagram. Load before building or restyling any UI in this project.
---

# Chicken Out — Design System (dark edition)

**Direction.** Section order follows the restaurant template in the client's
reference video (youtube.com/shorts/ZYqRlWiiFjQ). The skin follows a dark,
premium fast-food concept the client liked: warm dark surfaces lit by red
glows, frosted-glass cards and buttons, and **uncluttered** layouts (the client found that reference too crowded). Brand
identity is kept: logo red + wordmark yellow, polaroid frames, red tile wall,
script slogans from Instagram ("Certified Crunch").

The previous light/retro version is archived in `archive/light-v1/`
(src, tailwind config, old SKILL.md).

**Content rule.** Never invent facts. Menu, prices, hours, address, rating
and reviews come from foodpanda and the Instagram bio. All copy lives in
`src/lib/content.ts`, `src/lib/site.ts`, `src/lib/menu.ts`.

## Palette (tailwind.config.ts)

| Token | Value | Use |
|---|---|---|
| `brand` | `#E80404` (spicy `#D81A00`) | Primary buttons, glows, active tabs, badges |
| `accent` | `#FCC810` (spicy `#FF7419`) | Headline highlight line, script eyebrows, kickers, price pills |
| `night-deep` / `night` / `night-raised` | `#150B0A` / `#1E1210` / `#2A1916` | Red-tinted warm darks, darkest to lightest. The client found near-black too dark, so don't go darker |
| `cream` | `#FFF6E6` | Body text (use /55–/90 opacity), polaroid frames |

`brand`, `brand-dark`, `accent` are CSS variables (registered with `@property`
so the OG ⇄ Spicy switch animates them). Opacity modifiers like `bg-brand/50`
don't work on them; use `color-mix(in srgb, var(--brand) N%, …)` in inline styles.

Surfaces: `.bg-tiles-dark` (tile grout over a red glow in the dark; move the
light with `--glow-at`), `.bg-tiles` (brighter red tile card), `.glass`
(frosted panel). Dark only.

## Type — do not change the fonts

The client explicitly wants these fonts kept. A switch to Archivo was rejected.

- **Anton** (`font-display`): every headline, uppercase, one weight only (`font-synthesis: none`; never add `font-bold/black`). For display text outside headings (prices, badges, names, stats) use the `.display` class. Sizes: `text-hero`, `text-h2`, `text-h3`, `text-h4`.
- **Barlow** (`font-sans`): body and UI. Buttons, nav, tabs and tags are bold uppercase with letter-spacing.
- **Yellowtail** (`font-script`, `.eyebrow-script`): accent-colored script line above every headline. This is the brand's Instagram voice.
- `.text-stamp` / `.text-stamp-sm`: wordmark yellow with a stepped black extrusion, like the logo, for the highlight line of a headline.
- `.kicker`: small uppercase accent label above card titles.
- **Noto Sans Bengali**: fallback so `৳` renders. Never remove.

New font-size / shadow tokens must also be added to `src/lib/cn.ts`.

## Components

- Buttons: `btn` + `btn-red` (primary, glow) | `btn-glass` (transparent frosted, white border) | `btn-yellow`. End with `<BtnArrow />` (circle-arrow chip; `external` for off-site links).
- `src/components/ui/brand.tsx`: `Polaroid`, `PriceSticker`, `BtnArrow`, `BucketStack`, `SectionTitle`, `SpicyMark`.
- `src/components/heat.tsx`: OG ⇄ Spicy switch (hero + header). Swaps hero, ribbon slogans, menu filter; adds embers + flame badges.
- `src/components/open-status.tsx`: live open/closed badge (Asia/Dhaka).
- `src/components/mobile-order-bar.tsx`: frosted bottom bar below `lg` after the hero.
- `src/components/sections/highlights.tsx`: frosted fact tiles, rendered inside the hero.

## Page order

Info bar (live status) → sticky frosted header over the hero (logo · nav ·
heat switch · red Order) → hero (switch, headline, CTAs, product, fact tiles)
→ About (polaroids + glass recipe cards) → Menu (glass tabs + cards) → dark
red slogan ribbon → late-night photo band → two offer banners (red-lit +
glass) → reviews on dark tiles → Visit (glass card + red tile IG card) → footer.

## Motion

Heat-switch color morph, hero crossfade, spicy embers, slow-bobbing crumbs,
ribbon marquee, hover lifts/glows. Nothing scroll-driven (the client rejected
a scroll-filling bucket as cheap). All motion stops under reduced motion.

## Pending

A hero video is coming. The client has none yet, so don't build a slot for it until it arrives.
