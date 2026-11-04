"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "findings", label: "The Builder’s Demography" },
  { id: "nigeria", label: "Building in Nigeria" },
  { id: "ai", label: "Building with AI" },
  { id: "ecosystem", label: "The Builder’s Ecosystem" },
  { id: "banking", label: "Banking on the Builder" },
  { id: "index", label: "The Builder’s Index" },
  { id: "future", label: "Building for the Future" },
];

export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  /* Track scroll progress + which section is in view */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      // Active = last section whose top has passed 40% of the viewport
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      // At the very bottom, the last existing section is active
      if (max > 0 && window.scrollY >= max - 2) {
        const last = [...sections]
          .reverse()
          .find((s) => document.getElementById(s.id));
        if (last) current = last.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Phones/tablets: keep the active item visible in the horizontally scrolling list */
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const item = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!item) return;
    const left = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Move focus to the section so keyboard/screen-reader users land there too
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white backdrop-blur supports-backdrop-filter:bg-white/85">
      {/* Scroll progress bar along the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 -translate-y-full overflow-hidden sm:h-1.5"
      >
        <div
          className="h-full origin-left bg-[linear-gradient(to_right,var(--brand-lighter),var(--brand-light),var(--brand),var(--brand-dark),var(--brand-deep))]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav aria-label="Report sections">
        <ul
          ref={listRef}
          className="mx-auto flex max-w-screen-2xl items-center gap-6 overflow-x-auto px-4 py-3 no-scrollbar sm:gap-8 sm:px-6 sm:py-4 xl:justify-between xl:gap-4 xl:px-10"
        >
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} data-id={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(s.id);
                  }}
                  aria-current={isActive ? "location" : undefined}
                  className={`group cursor-pointer! flex items-center gap-2 rounded-full py-1 pr-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:text-base 2xl:text-lg ${
                    isActive
                      ? "text-brand"
                      : "text-neutral-900 hover:text-brand"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors lg:size-7 lg:text-sm ${
                      isActive
                        ? "border-brand bg-brand text-white"
                        : "border-neutral-900 group-hover:border-brand"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="sr-only">Section {i + 1}: </span>
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
