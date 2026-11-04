import type { ReactNode } from "react";

/* ---------- Palette (driven by --brand in globals.css) ---------- */
export const DARK = "var(--brand-dark)";
export const MID = "var(--brand)";
export const LIGHT = "var(--brand-light)";
export const PALE = "var(--brand-pale)";

/* ---------- Card with yellow offset block ---------- */

export function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`relative border-2 border-black bg-[#FCFCFA] px-4 py-5 shadow-[8px_8px_0_0_var(--color-brand-yellow),8px_8px_0_2px_#171717] sm:px-6 sm:py-6 lg:px-6 ${className}`}
    >
      <h3 className="flex items-start gap-2 text-base font-semibold leading-snug  sm:text-lg md:text-[26px]">
        <span
          aria-hidden="true"
          className="mt-1.5 h-6 w-0.75 shrink-0 bg-brand-yellow"
        />
        {title}
      </h3>
      {children}
    </article>
  );
}

/* ---------- Pie / donut ---------- */

export type Segment = {
  label: string;
  value: number;
  color: string;
  textColor?: string;
};

export { Pie, BarList } from "./AnimatedCharts";

/* ---------- Horizontal percentage bars ---------- */

export type Bar = {
  label: string;
  value: number;
  color: string;
  /** Colour of the value text after the bar (defaults to the bar colour) */
  valueColor?: string;
  /** Bar too short for its label: show "Label (x%)" after the bar instead */
  labelOutside?: boolean;
};
