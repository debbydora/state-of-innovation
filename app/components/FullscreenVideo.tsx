"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Phase = "idle" | "opening" | "open" | "closing";

const DURATION = 500;

export default function FullscreenVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const centring = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");
  /** Where the player sits in the page: start/end point of the zoom */
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [expanded, setExpanded] = useState(false);

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Grow from the measured box to the full screen */
  const expand = () => {
    const r = slotRef.current?.getBoundingClientRect();
    if (!r) return;
    setRect(r);
    setExpanded(false);
    setPhase("opening");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setExpanded(true);
        setTimeout(() => setPhase("open"), reduced() ? 0 : DURATION);
      }),
    );
  };

  const open = () => {
    const r = slotRef.current?.getBoundingClientRect();
    if (!r) return;
    // First bring the video to the middle of the screen, so the zoom grows
    // out evenly from the centre instead of from wherever it happens to sit.
    const offset = r.top + r.height / 2 - window.innerHeight / 2;
    if (reduced() || Math.abs(offset) < 4) {
      window.scrollBy({ top: offset });
      return expand();
    }
    if (centring.current) return;
    centring.current = true;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      centring.current = false;
      window.removeEventListener("scrollend", go);
      expand();
    };
    window.addEventListener("scrollend", go, { once: true });
    setTimeout(go, 600); // fallback for browsers without scrollend
    window.scrollBy({ top: offset, behavior: "smooth" });
  };

  const close = () => {
    const r = slotRef.current?.getBoundingClientRect();
    if (r) setRect(r);
    setExpanded(false);
    setPhase("closing");
    setTimeout(
      () => {
        setPhase("idle");
        document.body.style.overflow = "";
        playRef.current?.focus();
      },
      reduced() ? 0 : DURATION,
    );
  };

  // Esc closes; move focus to the close button once open
  useEffect(() => {
    if (phase !== "open") return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  const active = phase !== "idle";

  const clip =
    expanded || !rect
      ? "inset(0px 0px 0px 0px)"
      : `inset(${rect.top}px ${window.innerWidth - rect.right}px ${
          window.innerHeight - rect.bottom
        }px ${rect.left}px)`;

  const overlay = active
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          style={{ clipPath: clip, WebkitClipPath: clip }}
          className="fixed inset-0 z-150 bg-black transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        >
          {phase === "open" ? (
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              onEnded={close}
              className="h-full w-full object-contain"
              aria-label={title}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="h-full w-full object-cover" />
          )}

          {phase === "open" && (
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute top-4 right-4 z-20 flex size-8 cursor-pointer! items-center justify-center rounded-[20px] bg-[#490247] text-white backdrop-blur-sm transition-colors  focus-visible:outline-3 focus-visible:outline-brand-yellow sm:top-6 sm:right-6"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <div
      ref={slotRef}
      className="relative aspect-video w-full overflow-hidden border border-brand-yellow bg-black"
    >
      <button
        ref={playRef}
        type="button"
        onClick={open}
        disabled={active}
        className="group absolute inset-0 z-10 cursor-pointer! focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow"
      >
        <span className="sr-only">Play video: {title}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-transform group-hover:scale-110 sm:size-16"
        >
          <svg viewBox="0 0 24 24" className="ml-1 size-7 text-white sm:size-8">
            <path d="M6 4v16l14-8z" fill="currentColor" />
          </svg>
        </span>
      </button>
      {overlay}
    </div>
  );
}
