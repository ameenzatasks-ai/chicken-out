/**
 * Section copy for the home page. Brand lines ("Certified Crunch", "Crispy
 * Since Day 1", "Too Good To…") are lifted from the brand's own Instagram
 * creatives; product facts come from src/lib/menu.ts.
 *
 * Image fields are paths under /public. The current photos are stand-ins —
 * swap in the brand's own shoot when available.
 */
export const content = {
  // One hero per heat; the OG ⇄ Spicy switch flips between them.
  hero: {
    switchLabel: { og: "Pick your heat", spicy: "Brave choice." },
    modes: {
      og: {
        script: "Certified Crunch",
        titleTop: "OG Crispy",
        titleStamp: "Chicken",
        body: "Fried until golden and seasoned with our classic herb & secret spice blend. The one that started it all.",
        sticker: { top: "from", price: 160 },
        menuCta: "See the menu",
      },
      spicy: {
        script: "Too hot to handle?",
        titleTop: "Don’t",
        titleStamp: "Chicken Out",
        body: "Our spicy fried chicken is marinated in fiery chili and traditional aromatic spice. Extra heat, same crunch.",
        sticker: { top: "from", price: 180 },
        menuCta: "See the spicy picks",
      },
    },
  },

  about: {
    script: "About our food",
    titleLines: ["Better chicken.", "Bolder flavours.", "Made different."],
    body: "Chicken Out is a fried chicken spot at Centrum Food Court in Bashundhara. The menu stays tight — two recipes, done right, as pieces, wings, strips, burgers and wraps — and the fryers stay on late for the midnight crowd.",
    recipes: [
      {
        name: "The OG",
        text: "Classic herb & secret spice blend, fried until golden and properly crunchy.",
      },
      {
        name: "The Spicy",
        text: "Fiery chili & aromatic spice in the marinade and the batter. For people who don’t chicken out.",
      },
    ],
    photoMain: { src: "/images/gallery-paper-bag.jpg", alt: "Fried chicken pieces served in paper boats" },
    photoSmall: { src: "/images/menu-fried-chicken.jpg", alt: "Crispy chicken strips with a dip" },
    caption: "Crispy since day 1",
  },

  menu: {
    script: "Crispy, every bite",
    title: "The Menu",
    note: "Prices as listed on foodpanda. In-store prices may differ.",
  },

  ribbon: {
    og: ["Certified Crunch", "Crispy Since Day 1", "Better Chicken", "Bolder Flavours", "Made Different", "Too Good To Share"],
    spicy: ["Don’t Chicken Out", "Bring The Heat", "Fiery Chili", "Extra Spicy", "Extra Crispy", "Certified Crunch"],
  },

  lateNight: {
    script: "Late-night cravings?",
    title: ["Open late,", "every night"],
    body: "Swing by Centrum Food Court in Bashundhara, or have it brought to your door with foodpanda.",
    bg: "/images/gallery-paper-bag.jpg",
  },

  offers: [
    {
      script: "Make it a meal",
      title: "Add fries & slaw",
      lines: ["French fries from ৳120", "Coleslaw from ৳100"],
      cta: "Add to order",
      art: "/images/hero/bucket.png",
      artSize: [646, 651] as const,
      artAlt: "Chicken Out bucket",
    },
    {
      script: "Too good to share",
      title: "Wings & strips",
      lines: ["OG Wings from ৳269", "Spicy Strips from ৳430"],
      cta: "Order now",
      art: "/images/hero/piece-thigh.png",
      artSize: [374, 304] as const,
      artAlt: "A piece of crispy fried chicken",
    },
  ],

  reviews: {
    script: "Don’t take our word for it",
    // Customer reviews from the brand's foodpanda page. Spelling tidied only.
    items: [
      {
        quote:
          "Genuinely one of the best crispy chicken burgers I have ever had in Bangladesh. Buns are high quality, chicken’s juicy, fries don’t have that much salt. Perfect.",
        name: "Azaan",
        badge: "",
      },
      {
        quote:
          "The OG crispy chicken burger never disappoints. 10/10 from me. Get the OG Crispy Burger if you love big, juicy and flavourful burgers.",
        name: "Ali.Nameer",
        badge: "Top Reviewer",
      },
      {
        quote:
          "I like the Chicken Out spicy burger. Good size, taste, and they use better quality buns than a lot of places. Keep up the good work.",
        name: "Osamah",
        badge: "Top Reviewer",
      },
    ],
  },

  visit: {
    script: "Come hungry",
    title: "Visit us",
  },

  instagram: {
    script: "Follow the crunch",
    body: "New drops, late-night specials and what’s cooking at Centrum — first on Instagram.",
  },
} as const;
