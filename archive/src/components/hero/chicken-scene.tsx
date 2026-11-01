"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useContainerScroll } from "./container-scroll";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

/**
 * Choreography runs in a fixed 880x560 design space, then scales to fit the
 * card. One coordinate system means the paths are authored once and stay
 * physically consistent at every breakpoint.
 */
const SCENE_W = 880;
const SCENE_H = 560;

/** Bucket geometry, in scene coords. */
const BUCKET = { w: 300, h: 302, top: 250 };
/**
 * Centre of the bucket's rim ellipse (measured from the artwork: the lip's
 * widest row sits at sprite y=49, which maps here). Every path converges here.
 */
const RIM = { x: 440, y: 273 };
/**
 * The front slice of the bucket, cut at the rim's widest row and re-drawn ABOVE
 * the chicken. This is what makes pieces read as sitting *inside* the bucket
 * rather than pasted on its face — their lower halves are occluded exactly
 * where they cross the mouth. Seam-free: it's a pixel-identical copy of the
 * same region already drawn underneath.
 */
const FRONT = { top: 23, w: 300, h: 280 };
/**
 * The real heap, cut from the supplied "Filled Bucket" artwork (everything
 * above its rim). Sits between the pieces and the bucket front, so its bottom
 * edge — which carries a sliver of the source lip — is hidden by the front.
 *
 * It fills by translating UP out of the bucket: at y = HEAP.h it sits entirely
 * behind the front layer and is invisible; at y = 0 it's the full pile. Pure
 * transform, so no distortion and nothing to composite per frame.
 */
const HEAP = { w: 300, h: 133, top: 151 };

/** Layout effect on the client, plain effect on the server (avoids the SSR warning). */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Contain-fit the fixed design space inside whatever the card gives us.
 * CSS can't divide length by length, so a pure-CSS ratio scale isn't possible;
 * measuring is the only way to guarantee the scene fits at every viewport
 * instead of guessing with breakpoint scales.
 */
function useContainScale(ref: RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = (w: number, h: number) => {
      if (w > 0 && h > 0) setScale(Math.min(w / SCENE_W, h / SCENE_H));
    };
    // offsetWidth/Height, not getBoundingClientRect: the card applies rotateX
    // via perspective, and getBoundingClientRect would fold that projection
    // into the result (measuring ~234x347 instead of the real 309x446),
    // shrinking the scene depending on whether the effect happened to run
    // before or after framer set the transform. Offsets ignore transforms.
    measure(el.offsetWidth, el.offsetHeight);
    // contentRect is likewise the untransformed layout box.
    const ro = new ResizeObserver(([e]) =>
      measure(e.contentRect.width, e.contentRect.height),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return scale;
}

/** The two distinct silhouettes we can cut from the supplied artwork. */
const THIGH = { src: "/images/hero/piece-thigh.png", w: 152, h: 124 };
const PAIR = { src: "/images/hero/bucket-fill.png", w: 196, h: 143 };

type Piece = {
  id: string;
  art: { src: string; w: number; h: number };
  flip: boolean;
  /** scrollYProgress checkpoints for this piece's own path */
  range: number[];
  x: number[];
  y: number[];
  rot: number[];
  /** Shrink as it drops in — sells depth into the mouth. */
  restScale: number;
  land: number;
  ambient: { dur: number; dy: number; rot: number; delay: number };
};

/**
 * Values are hand-authored, not Math.random() — random during render would
 * differ between server and client and break hydration. Each piece gets its own
 * curve, rotation rate, and landing beat so nothing moves in lockstep.
 *
 * Ten pieces fly their own curved paths and drop into the mouth in sequence.
 * Each terminates below the rim line (scene y 273), where the bucket-front
 * layer occludes it — so it reads as falling *into* the bucket and merging
 * with the pile, rather than piling up as ten copies of one sprite.
 * The visible fullness comes from HEAP rising, which is the real artwork.
 */
const PIECES: Piece[] = [
  {
    id: "p1",
    art: THIGH,
    flip: false,
    range: [0.06, 0.2, 0.33, 0.42],
    x: [110, 190, 320, 412],
    y: [90, 148, 230, 305],
    rot: [-24, 44, 118, 172],
    restScale: 0.74,
    land: 0.42,
    ambient: { dur: 5.2, dy: 9, rot: 4, delay: 0 },
  },
  {
    id: "p2",
    art: THIGH,
    flip: true,
    range: [0.08, 0.24, 0.39, 0.48],
    x: [770, 692, 580, 468],
    y: [70, 132, 226, 308],
    rot: [22, -58, -132, -172],
    restScale: 0.74,
    land: 0.48,
    ambient: { dur: 6.1, dy: 12, rot: -5, delay: 0.8 },
  },
  {
    id: "p3",
    art: PAIR,
    flip: false,
    range: [0.1, 0.28, 0.44, 0.54],
    x: [430, 402, 428, 440],
    y: [10, 96, 200, 312],
    rot: [-278, -188, -98, -8],
    restScale: 0.74,
    land: 0.54,
    ambient: { dur: 4.6, dy: 7, rot: 6, delay: 1.6 },
  },
  {
    id: "p4",
    art: THIGH,
    flip: true,
    range: [0.13, 0.31, 0.5, 0.6],
    x: [150, 230, 340, 420],
    y: [420, 350, 284, 302],
    rot: [-286, -186, -86, 14],
    restScale: 0.64,
    land: 0.6,
    ambient: { dur: 7.0, dy: 10, rot: -6, delay: 0.4 },
  },
  {
    id: "p5",
    art: PAIR,
    flip: false,
    range: [0.15, 0.34, 0.54, 0.65],
    x: [340, 372, 410, 434],
    y: [50, 110, 200, 306],
    rot: [-138, -28, 82, 182],
    restScale: 0.66,
    land: 0.65,
    ambient: { dur: 5.7, dy: 8, rot: 5, delay: 2.2 },
  },
  {
    id: "p6",
    art: PAIR,
    flip: true,
    range: [0.18, 0.38, 0.59, 0.7],
    x: [700, 624, 540, 458],
    y: [420, 348, 288, 304],
    rot: [286, 186, 86, -14],
    restScale: 0.66,
    land: 0.7,
    ambient: { dur: 6.6, dy: 11, rot: -4, delay: 1.1 },
  },
  {
    id: "p7",
    art: THIGH,
    flip: false,
    range: [0.2, 0.42, 0.64, 0.75],
    x: [830, 744, 620, 472],
    y: [300, 292, 282, 310],
    rot: [446, 356, 261, 166],
    restScale: 0.64,
    land: 0.75,
    ambient: { dur: 5.0, dy: 9, rot: 7, delay: 2.9 },
  },
  {
    id: "p8",
    art: THIGH,
    flip: true,
    range: [0.24, 0.46, 0.68, 0.8],
    x: [60, 170, 320, 424],
    y: [260, 244, 244, 300],
    rot: [-70, 20, 105, 190],
    restScale: 0.64,
    land: 0.8,
    ambient: { dur: 7.4, dy: 13, rot: -5, delay: 0.2 },
  },
  {
    id: "p9",
    art: THIGH,
    flip: false,
    range: [0.28, 0.5, 0.72, 0.86],
    x: [560, 528, 490, 452],
    y: [30, 84, 180, 308],
    rot: [256, 171, 86, 6],
    restScale: 0.64,
    land: 0.86,
    ambient: { dur: 4.9, dy: 8, rot: 6, delay: 1.7 },
  },
  {
    id: "p10",
    art: THIGH,
    flip: false,
    range: [0.32, 0.55, 0.78, 0.92],
    x: [250, 330, 400, 438],
    y: [60, 96, 190, 302],
    rot: [-64, 16, 96, 176],
    restScale: 0.58,
    land: 0.92,
    ambient: { dur: 6.3, dy: 7, rot: -7, delay: 2.5 },
  },
];

/** Ambient crumbs drifting in the air. Deterministic. */
const AMBIENT = [
  { src: 1, x: 118, y: 168, s: 26, dur: 7.5, dy: -16, delay: 0.0, opa: 0.75 },
  { src: 2, x: 762, y: 214, s: 22, dur: 9.0, dy: -22, delay: 1.2, opa: 0.6 },
  { src: 3, x: 236, y: 372, s: 18, dur: 8.2, dy: -14, delay: 2.1, opa: 0.5 },
  { src: 4, x: 668, y: 402, s: 20, dur: 10.5, dy: -18, delay: 0.6, opa: 0.55 },
  { src: 5, x: 350, y: 84, s: 14, dur: 6.8, dy: -12, delay: 1.8, opa: 0.45 },
  { src: 6, x: 545, y: 128, s: 16, dur: 11.2, dy: -20, delay: 2.6, opa: 0.5 },
  { src: 2, x: 80, y: 300, s: 13, dur: 9.6, dy: -15, delay: 3.1, opa: 0.4 },
  { src: 3, x: 812, y: 320, s: 15, dur: 7.9, dy: -13, delay: 0.3, opa: 0.42 },
];

/** Seasoning specks — pure CSS dots, cheapest possible ambient motion. */
const SPECKS = [
  { x: 196, y: 132, s: 3, dur: 6.2, delay: 0.0 },
  { x: 640, y: 96, s: 2, dur: 7.4, delay: 0.9 },
  { x: 428, y: 196, s: 2.5, dur: 5.8, delay: 1.7 },
  { x: 300, y: 268, s: 2, dur: 8.1, delay: 2.4 },
  { x: 726, y: 300, s: 3, dur: 6.9, delay: 0.5 },
  { x: 152, y: 240, s: 2, dur: 9.3, delay: 3.0 },
  { x: 588, y: 372, s: 2.5, dur: 7.1, delay: 1.3 },
  { x: 380, y: 420, s: 2, dur: 8.6, delay: 2.8 },
  { x: 700, y: 168, s: 2, dur: 6.4, delay: 3.6 },
  { x: 260, y: 60, s: 2.5, dur: 9.9, delay: 1.1 },
];

/** Crumbs kicked out of the bucket when a piece lands. */
const SPLASH = [
  { src: 1, dx: -78, dy: -54, rot: -140, s: 20, d: 0.0 },
  { src: 2, dx: 84, dy: -46, rot: 165, s: 18, d: 0.03 },
  { src: 3, dx: -46, dy: -74, rot: -95, s: 15, d: 0.06 },
  { src: 4, dx: 58, dy: -70, rot: 120, s: 16, d: 0.02 },
  { src: 5, dx: -104, dy: -24, rot: -60, s: 12, d: 0.08 },
  { src: 6, dx: 108, dy: -30, rot: 80, s: 13, d: 0.05 },
];

function FlyingPiece({
  piece,
  progress,
  reduce,
  isLanded,
}: {
  piece: Piece;
  progress: MotionValue<number>;
  reduce: boolean;
  isLanded: boolean;
}) {
  // Multi-keyframe transforms produce a curved path — never a straight line.
  const x = useTransform(progress, piece.range, piece.x);
  const y = useTransform(progress, piece.range, piece.y);
  const rotate = useTransform(progress, piece.range, piece.rot);
  // Shrinks into the mouth instead of fading out, so the piece stays visible
  // and the bucket reads as filling up.
  const scale = useTransform(
    progress,
    [piece.land - 0.1, piece.land],
    [1, piece.restScale],
  );

  return (
    <motion.div
      className="absolute left-0 top-0 z-[25]"
      style={{ x, y }}
      aria-hidden="true"
    >
      {/* Scroll-driven rotation + descent scale, about the piece's own centre. */}
      <motion.div
        className="gpu"
        style={{
          rotate,
          scale,
          width: piece.art.w,
          height: piece.art.h,
          marginLeft: -piece.art.w / 2,
          marginTop: -piece.art.h / 2,
        }}
      >
        {/* Ambient bob/wobble, nested so it composes with the fall instead of
            overwriting it. Stops once the piece is at rest in the bucket —
            chicken sitting in a bucket shouldn't float. */}
        <motion.div
          className="h-full w-full"
          animate={
            reduce || isLanded
              ? { y: 0, rotate: 0 }
              : { y: [0, -piece.ambient.dy, 0], rotate: [0, piece.ambient.rot, 0] }
          }
          transition={
            reduce || isLanded
              ? { type: "spring", stiffness: 260, damping: 20 }
              : {
                  duration: piece.ambient.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: piece.ambient.delay,
                }
          }
        >
          <Image
            src={piece.art.src}
            alt=""
            width={piece.art.w}
            height={piece.art.h}
            priority
            className={piece.flip ? "-scale-x-100" : undefined}
            style={{
              filter: "drop-shadow(0 12px 18px rgba(0,0,0,.55))",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Splash({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <div
      className="absolute left-0 top-0 z-[35]"
      style={{ transform: `translate(${RIM.x}px, ${RIM.y - 10}px)` }}
      aria-hidden="true"
    >
      {SPLASH.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{
            x: c.dx,
            y: [0, c.dy, c.dy + 46],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.8],
            rotate: c.rot,
          }}
          transition={{ duration: 0.85, delay: c.d, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={`/images/hero/crumb-${c.src}.png`}
            alt=""
            width={c.s}
            height={c.s}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function ChickenScene() {
  // Real MotionValue fallback: useMotionValueEvent calls .on() on whatever it
  // gets, so a null/placeholder here would throw when rendered outside the
  // provider. Hooks also must run unconditionally.
  const fallback = useMotionValue(0);
  const ctx = useContainerScroll();
  const progress = ctx ?? fallback;
  const reduce = useSafeReducedMotion();
  const [landed, setLanded] = useState(0);
  const bucket = useAnimationControls();
  const frame = useRef<HTMLDivElement>(null);
  const scale = useContainScale(frame);

  useMotionValueEvent(progress, "change", (v) => {
    const n = PIECES.filter((p) => v >= p.land).length;
    setLanded((prev) => (prev === n ? prev : n));
  });

  // Every landing kicks the bucket — a short, slightly overshooting squash.
  useEffect(() => {
    if (landed === 0 || reduce) return;
    bucket.start({
      scaleY: [1, 0.93, 1.04, 1],
      scaleX: [1, 1.05, 0.98, 1],
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    });
  }, [landed, bucket, reduce]);

  // With motion reduced, settle straight to the finished frame: full bucket,
  // no drifting particles, nothing mid-flight.
  const full = reduce ? true : landed >= PIECES.length;
  /** 0 = empty bucket, 1 = heap fully risen. Reduced motion jumps to full. */
  const fill = reduce ? 1 : landed / PIECES.length;

  return (
    <div
      ref={frame}
      className="relative grid h-full w-full place-items-center overflow-hidden"
    >
      <div
        className="relative origin-center"
        style={{
          width: SCENE_W,
          height: SCENE_H,
          transform: `scale(${scale ?? 1})`,
          // Hidden for the single frame before measurement lands. The layout
          // effect runs pre-paint, so this is never actually seen.
          opacity: scale === null ? 0 : 1,
        }}
      >
        {/* Warm floor glow under the bucket. */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 z-0 h-[220px] w-[560px] -translate-x-1/2 rounded-[50%]"
          style={{
            top: 400,
            background:
              "radial-gradient(closest-side, rgba(240,168,30,.22), rgba(184,20,35,.10) 55%, transparent 80%)",
            filter: "blur(6px)",
          }}
          animate={reduce ? undefined : { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
          transition={
            reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Ambient crumbs — never static. */}
        {!reduce &&
          AMBIENT.map((c, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              className={`absolute z-10 ${i > 4 ? "hidden md:block" : ""}`}
              style={{ left: c.x, top: c.y, opacity: c.opa }}
              animate={{ y: [0, c.dy, 0], rotate: [0, 180, 360] }}
              transition={{
                duration: c.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.delay,
              }}
            >
              <Image
                src={`/images/hero/crumb-${c.src}.png`}
                alt=""
                width={c.s}
                height={c.s}
              />
            </motion.div>
          ))}

        {/* Seasoning specks. */}
        {!reduce &&
          SPECKS.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={`absolute z-10 rounded-full bg-gold/70 ${i > 5 ? "hidden md:block" : ""}`}
              style={{ left: s.x, top: s.y, width: s.s, height: s.s }}
              animate={{ y: [0, -26, 0], opacity: [0.25, 0.9, 0.25] }}
              transition={{
                duration: s.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s.delay,
              }}
            />
          ))}

        {/* Bucket (z-20) with its heaped fill (z-30 inside this stacking
            context, so above the bucket art but below the landed pieces). */}
        <motion.div
          className="gpu absolute z-20 origin-bottom"
          style={{
            left: RIM.x - BUCKET.w / 2,
            top: BUCKET.top,
            width: BUCKET.w,
            height: BUCKET.h,
          }}
          animate={bucket}
        >
          <Image
            src="/images/hero/bucket.png"
            alt="Chicken Out bucket"
            width={BUCKET.w}
            height={BUCKET.h}
            priority
            style={{ filter: "drop-shadow(0 24px 30px rgba(0,0,0,.6))" }}
          />

        </motion.div>

        {/* The heap (z-30): above the falling pieces, below the bucket front.
            Rises out of the bucket one notch per landing. */}
        <motion.div
          className="gpu absolute z-30"
          style={{
            left: RIM.x - HEAP.w / 2,
            top: HEAP.top,
            width: HEAP.w,
            height: HEAP.h,
          }}
          initial={false}
          animate={{ y: (1 - fill) * HEAP.h }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 200, damping: 20 }
          }
          aria-hidden="true"
        >
          <Image
            src="/images/hero/bucket-heap.png"
            alt=""
            width={HEAP.w}
            height={HEAP.h}
            priority
            style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,.5))" }}
          />
        </motion.div>

        {/* Pieces render ABOVE the bucket back (z-30) so that once they land
            they stay visible in the mouth, rather than disappearing behind
            opaque bucket art and leaving it looking empty. */}
        {!reduce &&
          PIECES.map((p, i) => (
            <FlyingPiece
              key={p.id}
              piece={p}
              progress={progress}
              reduce={reduce}
              isLanded={landed > i}
            />
          ))}

        {/* Bucket front (z-32) — drawn over the pieces so their lower halves
            tuck into the mouth. Identical box + identical animation controls to
            the back layer, so the landing squash stays perfectly in sync. */}
        <motion.div
          className="gpu absolute z-[32] origin-bottom"
          style={{
            left: RIM.x - BUCKET.w / 2,
            top: BUCKET.top,
            width: BUCKET.w,
            height: BUCKET.h,
          }}
          animate={bucket}
          aria-hidden="true"
        >
          <Image
            src="/images/hero/bucket-front.png"
            alt=""
            width={FRONT.w}
            height={FRONT.h}
            priority
            className="absolute left-0"
            style={{ top: FRONT.top }}
          />
        </motion.div>

        {/* Landing splash — remounts per landing so it replays. */}
        <AnimatePresence>
          {landed > 0 && <Splash key={landed} reduce={reduce} />}
        </AnimatePresence>

        {/* Steam, once the bucket is full. */}
        <AnimatePresence>
          {full && !reduce && (
            <div className="absolute left-0 top-0 z-[36]" aria-hidden="true">
              {[-34, 0, 34].map((dx, i) => (
                <motion.span
                  key={dx}
                  className="absolute rounded-[50%] bg-cream/20 blur-[6px]"
                  style={{
                    // Rises off the top of the heap, not out of thin air.
                    left: RIM.x + dx - 11,
                    top: RIM.y - 92,
                    width: 22,
                    height: 34,
                  }}
                  initial={{ opacity: 0, y: 10, scaleX: 0.7 }}
                  animate={{ opacity: [0, 0.5, 0], y: [10, -70], scaleX: [0.7, 1.5] }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.7,
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Best Seller badge — pulses only once the bucket is full. */}
        <motion.div
          className="absolute z-40"
          style={{ left: RIM.x + 172, top: 244 }}
          animate={
            full && !reduce
              ? { scale: [1, 1.06, 1], rotate: [-3, -3, -3] }
              : { scale: 1, rotate: -3 }
          }
          transition={
            full && !reduce
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 320, damping: 24 }
          }
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-[15px] font-bold text-charcoal shadow-glow-gold">
            🔥 Best Seller
          </span>
        </motion.div>
      </div>
    </div>
  );
}
