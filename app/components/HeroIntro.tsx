"use client";

import { useEffect, useState } from "react";

const TEXT = "STATE OF INNOVATION REPORT";
const SYMBOLS = "()@!$+>#%^*\\";
const COLUMNS = 5;
// Order the columns lift in (index → delay step) for the staggered, blocky reveal
const COLUMN_ORDER = [1, 3, 0, 4, 2];

const SCRAMBLE_STEP = 45; // ms between frames
const LETTER_DELAY = 2; // frames before the next letter locks in
const HOLD = 450; // ms to hold the finished text
const LIFT = 900; // ms for one column to lift
const LIFT_STAGGER = 110; // ms between columns

/**
 * Intro overlay: purple panel, title decodes from random symbols left to
 * right, then the panel lifts away bottom → top in staggered columns.
 */
export default function HeroIntro() {
  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState<"decode" | "lift" | "done">("decode");

  const lockFrame = TEXT.length * LETTER_DELAY + 6;

  // Decode loop
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "hidden";
    const id = setInterval(() => {
      setFrame((f) => {
        if (f >= lockFrame) {
          clearInterval(id);
          setTimeout(() => setPhase("lift"), HOLD);
          return f;
        }
        return f + 1;
      });
    }, SCRAMBLE_STEP);
    return () => clearInterval(id);
  }, [lockFrame]);

  // Remove overlay after the lift
  useEffect(() => {
    if (phase !== "lift") return;
    const t = setTimeout(
      () => setPhase("done"),
      LIFT + LIFT_STAGGER * (COLUMNS - 1) + 50,
    );
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  const shown = TEXT.split("")
    .map((ch, i) => {
      if (ch === " ") return " ";
      const lockAt = i * LETTER_DELAY + 6;
      if (frame >= lockAt) return ch;
      // Letters not started yet stay blank so it types in left → right
      if (frame < lockAt - 10) return " ";
      return SYMBOLS[(frame * 7 + i * 13) % SYMBOLS.length];
    })
    .join("");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100 flex"
    >
      {Array.from({ length: COLUMNS }, (_, c) => (
        <div
          key={c}
          className="relative h-full flex-1 bg-[#490247] ease-[cubic-bezier(0.76,0,0.24,1)] [transition-property:transform] not-last:border-r not-last:border-white/5"
          style={{
            transform: phase === "lift" ? "translateY(-100%)" : "none",
            transitionDuration: `${LIFT}ms`,
            transitionDelay: `${COLUMN_ORDER[c] * LIFT_STAGGER}ms`,
          }}
        />
      ))}

      <p
        className="absolute inset-x-0 top-[35%] px-4 text-center font-mono text-sm tracking-[0.5em] whitespace-pre text-white font-bold transition-opacity duration-300 sm:text-base md:text-xl"
        style={{ opacity: phase === "lift" ? 0 : 1 }}
      >
        {shown}
      </p>
    </div>
  );
}
