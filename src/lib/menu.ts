/**
 * The live menu, transcribed from the brand's foodpanda page (Oct 2026).
 * Prices are foodpanda's "from" prices in Taka. Descriptions are foodpanda's,
 * lightly tidied — except the two marked `// written`, which foodpanda lists
 * without a description.
 *
 * `image` is optional: set it to a path under /public (e.g.
 * "/images/menu/og-crispy-chicken.jpg") and the card shows the photo.
 */

export type MenuCategory = "Chicken" | "Burger" | "Wrap" | "Sides";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  popular?: boolean;
  spicy?: boolean;
  image?: string;
};

export const menuCategories: MenuCategory[] = ["Chicken", "Burger", "Wrap", "Sides"];

export const menu: MenuItem[] = [
  {
    id: "og-crispy-chicken",
    name: "OG Crispy Chicken",
    category: "Chicken",
    description:
      "Crispy deep-fried chicken, seasoned with our classic herb & secret spice blend.",
    price: 160,
    popular: true,
  },
  {
    id: "spicy-chicken",
    name: "Chicken Out Spicy Chicken",
    category: "Chicken",
    description:
      "Extra spicy fried chicken, marinated in fiery chili & traditional aromatic spice.",
    price: 180,
    popular: true,
    spicy: true,
  },
  {
    id: "og-wings",
    name: "OG Wings",
    category: "Chicken",
    description:
      "Crispy chicken wings tossed in classic savoury seasoning and fried until golden.",
    price: 269,
    popular: true,
  },
  {
    id: "og-strips",
    name: "OG Chicken Strips",
    category: "Chicken",
    // written
    description: "Crispy boneless chicken strips in the OG herb & spice seasoning.",
    price: 420,
    popular: true,
  },
  {
    id: "spicy-strips",
    name: "Chicken Out Spicy Strips",
    category: "Chicken",
    description:
      "Crispy boneless chicken strips in a hot spice & spicy batter coating.",
    price: 430,
    spicy: true,
  },
  {
    id: "og-burger",
    name: "OG Crispy Burger",
    category: "Burger",
    // written
    description: "Our OG crispy fried chicken, stacked in a soft bun.",
    price: 330,
    popular: true,
  },
  {
    id: "spicy-burger",
    name: "Chicken Out Spicy Burger",
    category: "Burger",
    description:
      "Crispy fried chicken patty in a soft bun with spice, creamy sauce & fresh lettuce.",
    price: 420,
    popular: true,
    spicy: true,
  },
  {
    id: "wrap",
    name: "Chicken Out Wrap",
    category: "Wrap",
    description:
      "Tortilla, chicken fillet, lettuce, onion, cheese, capsicum & tortilla sauce.",
    price: 299,
  },
  {
    id: "spicy-wrap",
    name: "Chicken Out Spicy Wrap",
    category: "Wrap",
    description:
      "Tortilla, chicken fillet, lettuce, onion, cheese, capsicum & Chicken Out spicy sauce.",
    price: 319,
    spicy: true,
  },
  {
    id: "fries",
    name: "French Fries",
    category: "Sides",
    description:
      "Golden, crunchy fries, lightly dusted with our savoury signature spice blend.",
    price: 120,
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    category: "Sides",
    description:
      "Red cabbage & carrot in a creamy mayo dressing with a squeeze of lemon.",
    price: 100,
  },
];
