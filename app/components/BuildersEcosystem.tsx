/* eslint-disable @next/next/no-img-element */
import { Card, BarList, type Bar } from "./charts";

/* ---------- Card 1: campus exposure ---------- */

const campus: Bar[] = [
  {
    label: "Entrepreneurship or Innovation courses",
    value: 73.2,
    color: "#9F1E9B",
  },
  { label: "Campus club, hub or incubator", value: 49.3, color: "#E552E1" },
];

function CampusCard() {
  return (
    <Card title="Can entrepreneurship be taught without somewhere to practise it?">
      <div className="mt-8">
        <BarList className="space-y-6" bars={campus} />
      </div>
      <p className="mt-1 text-sm sm:text-base pb-6">
        But only <strong>35.6%</strong> rated their campus entrepreneurship
        culture at 4 or 5 out of 5.
      </p>
      {/* Room for the note overlapping the bottom-right */}
      <div aria-hidden="true" className="h-16 sm:h-12" />
    </Card>
  );
}

/* ---------- Card 2: what builders need ---------- */

const needs: Bar[] = [
  { label: "Funding", value: 61.2, color: "#6A0967" },
  { label: "Mentors", value: 18.1, color: "#9F1E9B" },
  { label: "Customers", value: 10.1, color: "#E552E1", labelOutside: true },
];

function GrowthCard() {
  return (
    <Card title="What would help you grow?">
      <p className="mt-10 text-sm font-medium sm:text-base">
        When asked to rank what they needed most to grow, builders put these
        needs first:
      </p>
      <div className="mt-4 mb-8">
        <BarList bars={needs} />
      </div>
      {/* Room for the note overlapping the bottom-left */}
      <div aria-hidden="true" className="h-16 sm:h-14" />
    </Card>
  );
}

/* ---------- Section ---------- */

export default function BuildersEcosystem() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-10 sm:px-6 md:py-20 lg:py-24"
    >
      {/* Torn newspaper, top-right corner */}
      <img
        src="/images/ecosystem-newspaper.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-0 -top-2 -z-10 w-[clamp(6rem,14vw,12rem)] select-none"
      />

      <div className="mx-auto max-w-4xl ">
        <header>
          <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-pale-yellow px-4 py-1 text-base font-semibold  sm:text-xl">
            <span className="font-bold text-pale-yellow!">04.</span> The
            Builder&rsquo;s Ecosystem
          </p>
          <h2
            id="ecosystem-heading"
            className="mt-8 max-w-2xl font-archivo text-[clamp(1.75rem,5.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight md:max-w-4xl"
          >
            Everyone says &ldquo;
            <span className="bg-[linear-gradient(transparent_70%,var(--color-brand-yellow)_60%,var(--color-brand-yellow)_92%,transparent_92%)] px-1">
              ecosystem
            </span>
            &rdquo;. What actually reaches the builder?
          </h2>
        </header>

        <div className="mt-10 flex flex-col gap-20 md:mt-12 lg:gap-24">
          {/* Card 1 + note bottom-right */}
          <div className="relative">
            <CampusCard />
            <img
              src="/images/campus-note.png"
              alt="What connects classroom exposure to practical opportunities to build?"
              loading="lazy"
              className="absolute -bottom-6 right-2 z-10 w-40 select-none sm:right-8 md:-bottom-10  sm:w-48 md:w-52 lg:w-64 lg:-bottom-12 lg:right-6"
            />
          </div>

          {/* Card 2 + paper plane left, thinker right, note bottom-left */}
          <div className="relative pb-40 sm:pb-24 md:pb-0">
            <GrowthCard />

            <img
              src="/images/paper-plane.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute top-56 -left-14 z-10 w-24 select-none sm:w-20 md:-left-24 md:top-auto md:-bottom-10 md:w-36 lg:-left-56 lg:w-60 lg:-bottom-32"
            />
            <img
              src="/images/growth-note.png"
              alt="How well does the support available match the next problem a builder needs to solve?"
              loading="lazy"
              className="absolute bottom-0 top-90 left-8 z-10 w-44 select-none sm:w-64 md:-bottom-8 md:left-10 lg:w-72 lg:-bottom-14 lg:top-100"
            />
            <img
              src="/images/thinker.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute -bottom-10 -right-4 z-10 w-50 select-none sm:w-36 md:-bottom-20 md:-right-10 md:w-60 lg:-right-78 lg:w-96 lg:-bottom-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
