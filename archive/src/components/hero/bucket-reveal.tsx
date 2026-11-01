"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * The bucket "fills" as beat 3 plays. Same measured geometry as the original
 * scene (rim at scene y 273, front slice cut at the rim's widest row), so the
 * heap tucks in seam-free. Reused wholesale rather than re-derived.
 */
const SCENE_W = 880;
const SCENE_H = 560;
const BUCKET = { w: 300, h: 302, top: 240 };
const RIM = { x: 440, y: 263 };
const FRONT = { top: 23, w: 300, h: 280 };
const HEAP = { w: 300, h: 133, top: 141 };

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useContainScale(ref: RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState<number | null>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = (w: number, h: number) => {
      if (w > 0 && h > 0) setScale(Math.min(w / SCENE_W, h / SCENE_H));
    };
    // offsetWidth/Height ignore the ancestor's transforms — see the note in the
    // original scene about getBoundingClientRect folding in projection.
    measure(el.offsetWidth, el.offsetHeight);
    const ro = new ResizeObserver(([e]) =>
      measure(e.contentRect.width, e.contentRect.height),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

export function BucketReveal({
  rise,
  reduce,
}: {
  /** 0 = empty bucket, 1 = heap fully risen. */
  rise: MotionValue<number>;
  reduce: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const scale = useContainScale(frame);

  // Heap climbs out of the bucket; front layer hides it below the rim.
  const heapY = useTransform(rise, [0, 1], [HEAP.h, 0]);
  const steamOpacity = useTransform(rise, [0.75, 1], [0, 1]);
  const glowScale = useTransform(rise, [0, 1], [0.7, 1]);

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
          opacity: scale === null ? 0 : 1,
        }}
      >
        {/* Warm floor glow. */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 z-0 h-[220px] w-[560px] -translate-x-1/2 rounded-[50%]"
          style={{
            top: 380,
            scale: glowScale,
            background:
              "radial-gradient(closest-side, rgba(240,168,30,.24), rgba(184,20,35,.10) 55%, transparent 80%)",
            filter: "blur(6px)",
          }}
        />

        {/* Bucket back. */}
        <div
          className="absolute z-20"
          style={{
            left: RIM.x - BUCKET.w / 2,
            top: BUCKET.top,
            width: BUCKET.w,
            height: BUCKET.h,
          }}
        >
          <Image
            src="/images/hero/bucket.png"
            alt="Chicken Out bucket"
            width={BUCKET.w}
            height={BUCKET.h}
            priority
            style={{ filter: "drop-shadow(0 24px 30px rgba(0,0,0,.6))" }}
          />
        </div>

        {/* Heap — rises between the bucket back and its front lip. */}
        <motion.div
          className="gpu absolute z-30"
          style={{
            left: RIM.x - HEAP.w / 2,
            top: HEAP.top,
            width: HEAP.w,
            height: HEAP.h,
            y: heapY,
          }}
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

        {/* Bucket front — occludes the heap below the rim. */}
        <div
          className="absolute z-[32]"
          style={{
            left: RIM.x - BUCKET.w / 2,
            top: BUCKET.top,
            width: BUCKET.w,
            height: BUCKET.h,
          }}
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
        </div>

        {/* Steam once the bucket is full. */}
        <motion.div
          className="absolute left-0 top-0 z-[33]"
          style={{ opacity: steamOpacity }}
          aria-hidden="true"
        >
          {[-34, 0, 34].map((dx, i) => (
            <motion.span
              key={dx}
              className="absolute rounded-[50%] bg-cream/20 blur-[6px]"
              style={{
                left: RIM.x + dx - 11,
                top: RIM.y - 92,
                width: 22,
                height: 34,
              }}
              animate={
                reduce
                  ? undefined
                  : { opacity: [0, 0.5, 0], y: [10, -70], scaleX: [0.7, 1.5] }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.7,
                    }
              }
            />
          ))}
        </motion.div>

        {/* Best Seller badge. */}
        <motion.div
          className="absolute z-40"
          style={{ left: RIM.x + 150, top: 232, opacity: steamOpacity }}
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span className="inline-flex -rotate-3 items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-[15px] font-bold text-charcoal shadow-glow-gold">
            🔥 Best Seller
          </span>
        </motion.div>
      </div>
    </div>
  );
}
