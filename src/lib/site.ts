/**
 * Single source of truth for brand, contact, and navigation.
 * Facts here come from the brand's own channels (Oct 2026):
 *   - Instagram bio  — instagram.com/chickenoutdhaka
 *   - foodpanda page — foodpanda.com.bd/restaurant/kpzz/chicken-out
 * Anything not published there (phone, email, domain) is left out rather
 * than invented.
 */

export const site = {
  name: "Chicken Out",
  // Instagram bio, verbatim.
  tagline: "Better chicken. Bolder flavours. Made different.",
  description:
    "Chicken Out is a fried chicken spot in Centrum Food Court, Bashundhara, Dhaka. OG crispy chicken, spicy chicken, wings, strips, burgers and wraps — dine in, pick up, or order on foodpanda.",
  // Placeholder until the client confirms their domain.
  url: "https://chickenout.com.bd",
  locale: "en_BD",

  address: {
    venue: "Centrum Food Court",
    street: "Road No. 16, Bashundhara R/A",
    city: "Dhaka",
    country: "BD",
    full: "Centrum Food Court, Road No. 16, Bashundhara R/A, Dhaka",
  },
  directionsHref:
    "https://www.google.com/maps/search/?api=1&query=Centrum+Food+Court+Road+16+Bashundhara+Dhaka",

  // foodpanda lists Monday–Sunday 10:30–01:30. The Instagram bio says
  // "OPEN till 2AM" — confirm with the client which one to publish.
  hours: {
    days: "Every day",
    time: "10:30 AM – 1:30 AM",
    short: "Daily · 10:30 AM – 1:30 AM",
    // Drives the live "Open now" badge. 24h clock, Dhaka time; a close
    // earlier than the open means it runs past midnight.
    opensAt: "10:30",
    closesAt: "01:30",
    opensLabel: "10:30 AM",
    closesLabel: "1:30 AM",
    timeZone: "Asia/Dhaka",
  },
  hoursSchema: ["Mo-Su 10:30-01:30"],

  order: {
    foodpanda: "https://www.foodpanda.com.bd/restaurant/kpzz/chicken-out",
  },

  social: {
    instagram: "https://www.instagram.com/chickenoutdhaka/",
    instagramHandle: "@chickenoutdhaka",
  },

  // foodpanda shows "4.8/5 (100+)".
  rating: { value: "4.8", count: "100+", source: "foodpanda" },
} as const;

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
] as const;

/** Bengali Taka. Renders via the Noto Sans Bengali fallback in the font stack. */
export const TAKA = "৳";

export const price = (amount: number) => `${TAKA}${amount}`;
