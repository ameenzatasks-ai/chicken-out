"use client";
import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/**
 * Exposes the container's scrollYProgress to descendants so the chicken
 * choreography can ride the *same* MotionValue the card does, rather than
 * registering a second scroll listener that could drift out of sync.
 * The original animation logic below is unchanged.
 */
const ScrollProgress = createContext<MotionValue<number> | null>(null);
export const useContainerScroll = () => useContext(ScrollProgress);

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-16"
      ref={containerRef}
    >
      <div
        className="relative w-full py-8 md:py-24"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <ScrollProgress.Provider value={scrollYProgress}>
          <Card rotate={rotate} translate={translate} scale={scale}>
            {children}
          </Card>
        </ScrollProgress.Provider>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        // Warm-tinted depth. Pure-black shadows read as holes on charcoal.
        boxShadow:
          "0 0 #0000004d, 0 9px 20px rgba(0,0,0,.45), 0 37px 37px rgba(0,0,0,.35), 0 84px 50px rgba(0,0,0,.22), 0 149px 60px rgba(184,20,35,.06), 0 233px 65px rgba(240,168,30,.03)",
      }}
      className="mx-auto -mt-8 h-[30rem] w-full max-w-5xl rounded-[30px] border border-gold/25 bg-gradient-to-b from-graphite-lift to-graphite p-2 shadow-e4 md:h-[40rem] md:p-4"
    >
      {/* Inset reflection along the top edge — reads as glass, not a grey box. */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-charcoal via-charcoal to-[#120E0C] ring-1 ring-inset ring-cream/5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-40 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        {children}
      </div>
    </motion.div>
  );
};
