"use client";

import { useEffect, useRef, useState } from "react";
import type { Bar, Segment } from "./charts";

/* ---------- Reveal-on-scroll progress (0 → 1) ---------- */

/**
 * Returns a ref + progress value that animates from 0 to 1 (ease-out)
 * the first time the element scrolls into view. Respects reduced motion.
 */
function useReveal<T extends Element>(duration = 1400, linear = false) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduce) {
          setP(1);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setP(linear ? t : 1 - Math.pow(1 - t, 3)); // easeOutCubic
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, linear]);

  return [ref, p] as const;
}

/* ---------- Person pictogram (e.g. "9 out of 10") ---------- */

const PERSON_GREY = "#E3E3E1";
const PERSON_YELLOW = "#FFC417";

function PersonIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 48 111" aria-hidden="true" className="h-auto w-full">
      <g
        fill={on ? PERSON_YELLOW : PERSON_GREY}
        className="transition-[fill] duration-300 ease-out motion-reduce:transition-none"
      >
        <circle cx="24" cy="10" r="10" />
        {/* Torso + arms (medium build) */}
        <path d="M4 31a7 7 0 0 1 7-7h26a7 7 0 0 1 7 7v29a3.5 3.5 0 0 1-7 0V35h-1v70a5.5 5.5 0 0 1-11 0V68h-2v37a5.5 5.5 0 0 1-11 0V35h-1v25a3.5 3.5 0 0 1-7 0Z" />
      </g>
    </svg>
  );
}

/**
 * Row of person icons. All start grey; when scrolled into view the first
 * `filled` icons turn yellow one by one, left to right.
 */
export function PeopleChart({
  filled,
  total,
  label,
  className = "",
}: {
  filled: number;
  total: number;
  label: string;
  className?: string;
}) {
  // ~180ms per person, steady pace so each one visibly fills in turn
  const [ref, p] = useReveal<HTMLDivElement>(filled * 180, true);
  const lit = Math.floor(p * filled + 0.0001);

  return (
    <div ref={ref} role="img" aria-label={label} className={className}>
      {Array.from({ length: total }, (_, i) => (
        <PersonIcon key={i} on={i < lit} />
      ))}
    </div>
  );
}

/* ---------- Pie / donut ---------- */

/** Point on a circle, angle measured clockwise from 12 o'clock */
function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: r * Math.sin(rad), y: -r * Math.cos(rad) };
}

/**
 * Pie / donut drawn as SVG slices. Slices sweep round from the start angle
 * and their percentages count up as the chart scrolls into view.
 */
export function Pie({
  segments,
  startDeg = 0,
  donut = false,
  gap = 3,
  label,
  className = "",
}: {
  segments: Segment[];
  startDeg?: number;
  donut?: boolean;
  /** Space between slices, in chart units (chart radius = 50) */
  gap?: number;
  label: string;
  className?: string;
}) {
  const [ref, p] = useReveal<SVGSVGElement>(1600);
  const R = 50;
  const r0 = donut ? 27 : 0;
  const pad = gap + 1;
  const size = (R + pad) * 2;
  const sweep = startDeg + 360 * p; // colour has filled up to this angle

  const arc = (a0: number, a1: number) => {
    const large = a1 - a0 > 180 ? 1 : 0;
    const o0 = polar(R, a0);
    const o1 = polar(R, a1);
    if (donut) {
      const i0 = polar(r0, a0);
      const i1 = polar(r0, a1);
      return `M${o0.x} ${o0.y} A${R} ${R} 0 ${large} 1 ${o1.x} ${o1.y} L${i1.x} ${i1.y} A${r0} ${r0} 0 ${large} 0 ${i0.x} ${i0.y}Z`;
    }
    return `M0 0 L${o0.x} ${o0.y} A${R} ${R} 0 ${large} 1 ${o1.x} ${o1.y}Z`;
  };

  // Slices stay in their final place; only the colour sweeps round them
  const slices = segments.map((s, i) => {
    const before = segments.slice(0, i).reduce((sum, x) => sum + x.value, 0);
    const a0 = startDeg + (before / 100) * 360;
    const a1 = startDeg + ((before + s.value) / 100) * 360;
    const mid = (a0 + a1) / 2;
    const fillEnd = Math.min(a1, sweep);
    // Share of this slice that has been coloured (drives its label count-up)
    const local = Math.max(0, Math.min(1, (sweep - a0) / (a1 - a0)));

    return {
      ...s,
      d: arc(a0, a1),
      fill: fillEnd > a0 ? arc(a0, fillEnd) : null,
      local,
      shift: polar(gap, mid),
      text: polar(donut ? (R + r0) / 2 : R * 0.55, mid),
    };
  });

  // Whole numbers while counting, the real value (e.g. 12.5) at the end
  const fmt = (v: number, t: number) => {
    if (t >= 1) return `${v}`;
    const step = Number.isInteger(v) ? 1 : 10;
    return `${Math.round(v * t * step) / step}`;
  };

  return (
    <svg
      ref={ref}
      role="img"
      aria-label={label}
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      className={`aspect-square h-auto overflow-visible ${className}`}
    >
      {slices.map((s) => (
        <g key={s.label} transform={`translate(${s.shift.x} ${s.shift.y})`}>
          {/* Empty slice */}
          <path d={s.d} style={{ fill: "#E3E3E1" }} />
          {/* Colour filling in */}
          {s.fill && <path d={s.fill} style={{ fill: s.color }} />}
          {s.textColor !== "transparent" && s.local > 0 && (
            <text
              x={s.text.x}
              y={s.text.y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fill: s.textColor ?? "#fff" }}
              fontSize={donut ? 8 : 13}
              fontWeight={700}
              opacity={Math.min(1, s.local * 2)}
              aria-hidden="true"
            >
              {fmt(s.value, s.local)}%
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Horizontal percentage bars ---------- */

export function BarList({
  bars,
  size = "md",
  className,
}: {
  bars: Bar[];
  /** "lg" = taller bars with bigger text (Building in Nigeria cost card) */
  size?: "md" | "lg";
  className?: string;
}) {
  const [ref, p] = useReveal<HTMLUListElement>(1600);
  const lg = size === "lg";
  const text = lg ? "text-sm sm:text-2xl" : "text-sm sm:text-lg lg:text-xl";
  const done = p >= 1;

  return (
    <ul ref={ref} className={`space-y-3 ${className}`}>
      {bars.map((b) => {
        const shown = (b.value * p).toFixed(1);
        return (
          <li key={b.label}>
            <div
              role="img"
              aria-label={`${b.label}: ${b.value.toFixed(1)}%`}
              className={`flex items-stretch overflow-hidden rounded-2xl border-[1.5px] border-black bg-white sm:rounded-[20px] ${
                lg
                  ? "min-h-14 sm:min-h-17.5"
                  : "min-h-12 sm:min-h-14 lg:min-h-15"
              }`}
            >
              {/*
                Fill grows from 0 to exactly its percentage. Once finished,
                min-content stops a long single word overflowing the bar.
              */}
              <span
                aria-hidden="true"
                className={`flex shrink-0 items-center overflow-hidden rounded-2xl bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0_8px,transparent_8px_16px)] py-2 font-semibold leading-tight text-white wrap-break-word ${
                  p > 0.02 ? "px-3 sm:px-4" : "px-0"
                } ${text}`}
                style={{
                  width: `${b.value * p}%`,
                  minWidth: done ? "min-content" : undefined,
                  backgroundColor: b.color,
                }}
              >
                {!b.labelOutside && (
                  <span
                    className={`transition-opacity duration-300 ${
                      p > 0.6 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {b.label}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={`flex items-center pl-2.5 pr-3 font-semibold leading-tight tabular-nums ${text}`}
                style={{ color: b.valueColor ?? b.color }}
              >
                {b.labelOutside ? `${b.label} (${shown}%)` : `${shown}%`}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
