---
name: frontend-design
description: Chicken Out design system — restaurant-template structure (YouTube short ZYqRlWiiFjQ) dressed in the brand's Instagram look. Tokens, fonts, section order and content rules. Load before building or restyling any UI in this project.
---

# Chicken Out — Design System

**Direction.** Section structure follows the restaurant template shown in the
client's reference video (youtube.com/shorts/ZYqRlWiiFjQ). The skin comes from
the brand itself: the logo (Images/Chicken Out.png) and the Instagram feed
(instagram.com/chickenoutdhaka) — red tile walls, mustard yellow, retro
polaroid stickers, chunky wordmark with a black extrusion, script slogans.

**History.** A dark "KFC-concept" edition was tried, but the client chose this
original light version instead (2026-11-02). The dark version is in git commit
`6f26dd6`; don't reintroduce it unless asked.

**Content rule.** Never invent facts. Menu, prices, hours, address, rating
and reviews come from foodpanda (foodpanda.com.bd/restaurant/kpzz/chicken-out)
and the Instagram bio. Phone, email and domain are unpublished — leave them
out. All copy lives in `src/lib/content.ts`, `src/lib/site.ts`, `src/lib/menu.ts`.

## Palette (tailwind.config.ts)

| Token | Value | Use |
|---|---|---|
| `brand` | `#E80404` (spicy `#A30000`) | Logo field red: tile walls, primary buttons, accents |
| `accent` | `#FCC810` (spicy `#FF7419`) | Wordmark yellow: stamped headlines, stickers, highlight strip |
| `ink` | `#140C0A` | Text, borders, hard shadows, dark bands, footer |
| `cream` | `#FFF6E6` | Polaroid frames, alternate section bg, cards |
| `paper` | `#FFFFFF` | Default page bg |

Surfaces: `.bg-tiles` (red tile wall, 64px grout) for hero/reviews/IG card;
`.bg-checker` (logo's fine 28px grid) for small accents. Light theme only.

`brand`, `brand-dark` and `accent` are CSS variables (registered with
`@property` in globals.css so they animate). `data-heat="spicy"` retints
only the element that carries it and its children (today, just the hero).
Opacity modifiers (`bg-brand/50`) don't work on them; never hardcode the hex.

## Type — do not change the fonts (client's explicit wish)

- **Anton** (`font-display`) — all headings, uppercase. `text-hero`, `text-h2`, `text-h3`, `text-h4`.
- **Yellowtail** (`font-script`, `.eyebrow-script`) — script eyebrow above every heading.
- **Barlow** (`font-sans`) — body/UI. `text-lead`, `text-body`, `text-small`, `text-label`.
- **Noto Sans Bengali** — fallback so `৳` renders. Never remove.
- `.text-stamp` / `.text-stamp-sm` — yellow + stepped black extrusion, the logo move. Display words only.

New font-size tokens must also be added to `src/lib/cn.ts` (tailwind-merge).

## Components

- Buttons: `btn` + `btn-red | btn-yellow | btn-light | btn-ink` — pill, 2px ink border, hard offset shadow, presses flat.
- `src/components/ui/brand.tsx`: `Polaroid`, `PriceSticker`, `BucketStack` (bucket + heap + front-lip cut-outs), `SectionTitle`, `SpicyMark`.
- Cards: 2–3px ink border, rounded, `shadow-stamp` / `shadow-stamp-lg`.
- `src/components/heat.tsx`: controlled `HeatSwitch` (OG ⇄ Spicy). The hero owns the state and **auto-advances every 6s** like a slider, with a progress line under the switch. Hover/focus pauses it, clicking the switch picks a side and stops it, and reduced motion turns it off. There's no page-wide heat mode: only the hero retints. Its "See the spicy picks" button pre-selects the menu's Spicy tab via `MENU_FILTER_EVENT` (in `src/lib/menu.ts`).
- Hero art: the brand's menu photos (OG Crispy Chicken / Spicy Burger, from `Menu images/`) as tilted landscape `Polaroid`s (`ratio="aspect-[3/2]"`) with crumbs floating round. No price stickers.
- Header: a floating pill (`sticky top-3`, rounded-full, ink border, stamp shadow, round logo) over the hero. The hero's `-mt/pt` must match the pill's height (76px / 84px md).
- `src/components/open-status.tsx`: live "Open now / Closing soon / Closed" badge from `site.hours` in Asia/Dhaka time.
- `src/components/mobile-order-bar.tsx`: below `lg`, a bottom bar (status · directions · order) that appears once the hero scrolls away.

## Page order

Info bar (live open status) → floating pill nav (round logo · nav · red Order
CTA) → auto-sliding OG/Spicy hero on tiles → yellow highlights strip → About (polaroids + two recipes) → Menu
(category tabs, cards, foodpanda links) → slogan ribbon → late-night band →
two-up offer banners → reviews on tiles → Visit + Instagram → ink footer.

## Imagery

Brand photos: `public/images/menu/*.jpg` (web copies of `Menu images/`, 1200px)
and `public/images/about-*.jpg` (the client's own shots, in the About
polaroids; the originals are small, about 480px). The remaining
`public/images/*.jpg` are stock stand-ins (late-night band, offers). Menu
cards show a photo only when `image` is set in `menu.ts`.

## Motion

Hero auto-slide (crossfade + color morph), spicy embers, bobbing crumbs, ribbon marquee,
button press, card lift. Nothing scroll-driven: the client rejected a
scroll-filling bucket as cheap. All motion stops under reduced motion.
Container max 1200px.

## Pending

A hero video is coming. The client has none yet, so don't build a slot for it until it arrives.
