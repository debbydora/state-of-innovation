"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export type Expert = {
  name: string;
  /** Full quote — used as the image's alt text */
  quote: string;
  /** Ready-made quote card image filename in /public/images */
  image: string;
};

/**
 * Natively swipeable scroll-snap carousel (same feel as the 2030 cards).
 * The card snapped to the centre is enlarged; arrows, dots and keyboard
 * arrows scroll the same track.
 */
export default function ExpertsCarousel({ experts }: { experts: Expert[] }) {
  const [index, setIndex] = useState(0);
  const count = experts.length;
  const trackRef = useRef<HTMLUListElement>(null);

  // Work out which card is centred while the user scrolls/swipes
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const item = el.querySelector("li");
        if (!item) return;
        const i = Math.round(el.scrollLeft / item.offsetWidth);
        setIndex(Math.max(0, Math.min(count - 1, i)));
      });
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const go = (i: number) => {
    const el = trackRef.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    const target = Math.max(0, Math.min(count - 1, i));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left: target * item.offsetWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const arrowBtn =
    "flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-brand-yellow";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Expert perspectives"
      className="mt-10"
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Expert quotes — swipe or use the arrows"
        className="no-scrollbar flex snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain py-6 [--w:80%] before:w-[calc(50%-var(--w)/2)] before:shrink-0 before:content-[''] after:w-[calc(50%-var(--w)/2)] after:shrink-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow sm:py-12 sm:[--w:55%] md:[--w:40%] lg:py-20 lg:[--w:30%] xl:[--w:26%] 2xl:[--w:24%]"
      >
        {experts.map((ex, i) => {
          const active = i === index;
          return (
            <li
              key={ex.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className={`w-(--w) shrink-0 snap-center px-2 sm:px-3 ${
                active ? "relative z-10" : ""
              }`}
            >
              <button
                type="button"
                tabIndex={-1}
                onClick={() => go(i)}
                className={`block w-full origin-center transition-all duration-500 ease-out motion-reduce:transition-none ${
                  active
                    ? "translate-x-0 scale-105 opacity-100 sm:translate-x-[-5%] sm:scale-[1.25] lg:translate-x-[-6%] lg:scale-[1.4]"
                    : `scale-[0.8] cursor-pointer opacity-50 hover:opacity-75 ${
                        i < index
                          ? "translate-x-[-8%] sm:translate-x-[-14%] lg:translate-x-[-20%]"
                          : "translate-x-[8%] sm:translate-x-[14%] lg:translate-x-[20%]"
                      }`
                }`}
              >
                <img
                  src={`/images/${ex.image}`}
                  alt={`"${ex.quote}" — ${ex.name}`}
                  loading={Math.abs(i - index) <= 2 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-auto w-full"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous expert"
          className={arrowBtn}
        >
          <svg viewBox="0 0 10 12" className="size-3" aria-hidden="true">
            <path d="M10 0v12L0 6z" fill="currentColor" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {experts.map((ex, i) => (
            <button
              key={ex.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to expert ${i + 1}: ${ex.name}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-6 items-center focus-visible:outline-2 focus-visible:outline-brand-yellow"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-brand-light" : "w-1.5 bg-white"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === count - 1}
          aria-label="Next expert"
          className={arrowBtn}
        >
          <svg viewBox="0 0 10 12" className="size-3" aria-hidden="true">
            <path d="M0 0v12l10-6z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        Expert {index + 1} of {count}: {experts[index]?.name}
      </p>
    </div>
  );
}
