import type { Metadata, Viewport } from "next";
import { Anton, Barlow, Noto_Sans_Bengali, Yellowtail } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Condensed display face, like the reference template's hero headlines.
const display = Anton({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

// Retro script, as on the brand's Instagram creatives ("Certified Crunch").
const script = Yellowtail({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: "400",
});

const body = Barlow({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * Loaded solely so `৳` (U+09F3) resolves — the Latin faces don't include it,
 * and without this every price renders as tofu.
 */
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Fried Chicken in Bashundhara, Dhaka`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "fried chicken Dhaka",
    "fried chicken Bashundhara",
    "Centrum food court",
    "chicken burger Dhaka",
    "late night food Bashundhara",
    "Chicken Out",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/logo.png", width: 447, height: 447, alt: site.name }],
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#E80404",
  colorScheme: "light",
};

/** Restaurant structured data — published facts only. */
const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/logo.png`,
  servesCuisine: ["Fried Chicken", "Burgers", "Fast Food"],
  priceRange: "৳",
  currenciesAccepted: "BDT",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.venue}, ${site.address.street}`,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  openingHours: site.hoursSchema,
  hasMenu: `${site.url}/#menu`,
  sameAs: [site.social.instagram, site.order.foodpanda],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${script.variable} ${body.variable} ${bengali.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
