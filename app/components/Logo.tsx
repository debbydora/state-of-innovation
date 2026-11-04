import Link from "next/link";

type LogoProps = {
  className?: string;
};

/**
 * Sticker-style "state of innovation report" wordmark built with real text
 * (scales crisply, readable by assistive tech, no image request).
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="State of Innovation Report, home"
      className={`group inline-block rounded-md focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand ${className}`}
    >
      <span
        aria-hidden
        className="logo-sticker flex rotate-[-8deg] flex-col items-center font-display font-black lowercase leading-[0.78] tracking-[-0.06em] transition-transform duration-300 text-[clamp(1.25rem,3.2vw,2.2rem)]"
      >
        <span className="translate-x-[0.35em] text-white">state of</span>
        <span className="text-brand-yellow mt-px">innovation</span>
        <span className="translate-x-[-0.1em] text-white mt-px">
          report 2026
        </span>
      </span>
    </Link>
  );
}
