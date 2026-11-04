"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Share of the way to full-screen reached at each scroll step (0 = resting size) */
const LEVELS = [0, 0.3, 0.62, 1];

/**
 * Pins its content in the middle of the screen once it is reached, and zooms
 * it in three steps as the user keeps scrolling: small, bigger, then the
 * biggest, which fills the whole view. Scrolling on releases the pin.
 *
 * Needs a parent that does not use overflow:hidden (use overflow-x-clip),
 * otherwise sticky positioning stops working.
 */
export default function ScrollZoom({
  title,
  children,
  className = "",
}: {
  /** Heading shown above the content; fades out as the zoom grows */
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState({ scale: 1, step: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      const box = boxRef.current;
      if (!wrap || !box) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const travel = rect.height - vh;
      const p = travel > 0 ? Math.max(0, Math.min(1, -rect.top / travel)) : 0;

      // Steps: resting → 1st scroll → 2nd scroll → 3rd (fills the view)
      const step = p < 0.02 ? 0 : Math.min(3, Math.floor(p * 3.999) + 1);

      // Scale that makes the content fit the whole viewport
      const fit = Math.max(
        1,
        Math.min(vw / box.offsetWidth, vh / box.offsetHeight),
      );
      const scale = 1 + (fit - 1) * LEVELS[step];

      setZoom((z) =>
        z.step === step && Math.abs(z.scale - scale) < 0.001
          ? z
          : { scale, step },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // Tall track = the scroll distance used up by the three zoom steps.
    // Reduced motion: no pinning, no zoom, it just sits in the page.
    <div
      ref={wrapRef}
      className={`relative sm:h-[320vh] motion-reduce:h-auto ${className}`}
    >
      <div className="sticky top-0 flex sm:h-dvh flex-col items-center justify-center gap-8 motion-reduce:static motion-reduce:h-auto">
        {title && (
          <div
            className="mx-auto w-full max-w-4xl transition-opacity duration-500 motion-reduce:transition-none"
            style={{ opacity: zoom.step >= 2 ? 0 : 1 }}
          >
            {title}
          </div>
        )}
        <div
          ref={boxRef}
          className="w-full max-w-4xl scale-(--zoom) transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:scale-100 motion-reduce:transition-none"
          style={{ "--zoom": zoom.scale } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
