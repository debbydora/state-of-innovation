"use client";

import { useState } from "react";

/**
 * Poster with a play button; the real video only loads after the user
 * clicks (keeps the page fast and avoids autoplaying media).
 */
export default function DocumentaryVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-brand-yellow bg-black">
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="h-full w-full"
          aria-label={title}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute z-10 inset-0 focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow"
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
            <svg
              viewBox="0 0 24 24"
              className="ml-1 size-7 text-white sm:size-8"
            >
              <path d="M6 4v16l14-8z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
