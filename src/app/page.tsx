import { HeatProvider } from "@/components/heat";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/sections/about";
import { MenuSection } from "@/components/sections/menu";
import { Ribbon } from "@/components/sections/ribbon";
import { LateNight } from "@/components/sections/late-night";
import { Offers } from "@/components/sections/offers";
import { Testimonials } from "@/components/sections/testimonials";
import { Visit } from "@/components/sections/visit";
import { SiteFooter } from "@/components/site-footer";
import { MobileOrderBar } from "@/components/mobile-order-bar";

/**
 * Section order follows the reference restaurant template (YouTube short
 * ZYqRlWiiFjQ): header → product hero → feature strip → "about our food" →
 * popular items → special-offer band → two-up promo banners → reviews →
 * location → footer. HeatProvider drives the OG ⇄ Spicy switch.
 */
export default function Home() {
  return (
    <HeatProvider>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <MenuSection />
        <Ribbon />
        <LateNight />
        <Offers />
        <Testimonials />
        <Visit />
      </main>
      <SiteFooter />
      <MobileOrderBar />
    </HeatProvider>
  );
}
