/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

type Finding = {
  id: string;
  question: string;
  body: ReactNode;
  image: string;
  illustration: { src: string; width: number; height: number };
  illustrationAfter?: boolean;
  placement: string;
  cardBeside?: boolean;
  /** Per-finding extra classes — use these to size/position each item individually */
  illustrationClass?: string;
  noteClass?: string;
  cardClass?: string;
};

/** All note exports share the same canvas size */
const NOTE_W = 232;
const NOTE_H = 247;

const findings: Finding[] = [
  {
    id: "women",
    question: "Women are building but why so few in the picture?",
    image: "/images/women-led.png",
    illustration: {
      src: "/images/megaphone-woman.png",
      width: 180,
      height: 220,
    },
    placement: "md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5",
    illustrationClass: "w-30 -mb-6 md:mb-0 -mr-6 md:w-36 lg:ml-24 lg:w-40 z-10", // bigger, overlaps the note
    noteClass: "-rotate-3 -mb-8 md:-mb-8 z-10 md:w-40 ml-4", // tilt + nudge down
    cardClass: "md:-translate-y-1 md:translate-x-10 lg:translate-x-38", // shift the card (translate keeps its width)
    body: (
      <>
        <p>
          Women accounted for <strong>18%</strong> of active builders in our
          survey. Whose ideas, experiences and solutions get represented when
          participation is this uneven? <br /> The finding raises questions
          about who enters the ecosystem and the opportunities available to
          them.
        </p>
      </>
    ),
  },
  {
    id: "school",
    question: "Are Nigeria’s builders still in school?",
    image: "/images/school-builders.png",
    illustration: {
      src: "/images/graduation-cap.png",
      width: 200,
      height: 180,
    },
    illustrationAfter: true,
    placement:
      "md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-5 lg:-mt-20",
    illustrationClass:
      "w-30  translate-x-14 md:translate-x-70 md:translate-y-28 md:w-36  lg:w-40 z-10",
    noteClass:
      "translate-y-10 md:translate-y-0 md:translate-x-66 md:-mb-10 z-10 md:w-40 ",
    body: (
      <>
        <p>
          <strong>47.6%</strong> of surveyed builders identified as students,
          sometimes alongside employment or other work. <strong>85.8%</strong>{" "}
          were aged 18–34.
          <br /> For many, the building journey is beginning while education,
          work and career decisions are still unfolding.
        </p>
      </>
    ),
  },
  {
    id: "lagos",
    question: "Is Lagos the best place to build or simply the most visible?",
    image: "/images/lagos-build.png",
    illustration: {
      src: "/images/national-theatre.png",
      width: 260,
      height: 120,
    },
    placement:
      "md:col-start-3 md:col-span-10 lg:col-start-4 lg:col-span-8 lg:mt-20",
    illustrationClass:
      "w-32 -mr-6 md:mr-0 md:translate-x-20 lg:translate-x-0 md:w-40 lg:ml-14 lg:w-50 z-10",
    noteClass:
      "-rotate-2 md:-mb-8 md:translate-x-14 z-10 lg:w-40 ml-4 lg:ml-6 lg:translate-y-6 lg:translate-x-0",
    cardClass: "md:-translate-y-1 md:translate-x-10 lg:-translate-x-4",
    cardBeside: true,
    body: (
      <>
        <p>
          The South West accounted for <strong>42.6%</strong> of active
          builders, the largest regional group in this research. Yet{" "}
          <strong>57.6%</strong> of revenue-stage builders with a known Nigerian
          zone lived outside the South West. <br /> The survey cannot establish
          the best location to build. It does show why the story needs to extend
          beyond the most familiar cluster.
        </p>
      </>
    ),
  },
  {
    id: "team",
    question: "How much can a small team really do?",
    image: "/images/small-team.png",
    illustration: { src: "/images/handshake.png", width: 200, height: 140 },
    placement:
      "md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-5 lg:mt-10",
    illustrationClass:
      "w-30 translate-y-7 md:translate-y-0 md:w-36 lg:-translate-x-32 lg:-translate-y-10 z-10",
    noteClass:
      " translate-y-9 lg:-mb-8 z-10 lg:w-40  lg:translate-y-6 lg:-translate-x-30",
    cardClass:
      "md:-translate-y-1 md:translate-x-10 lg:translate-y-5 lg:-translate-x-4",
    body: (
      <>
        <p>
          <strong>80.9%</strong> worked alone or in teams of fewer than five.
          And <strong>91.5%</strong> had been building for three years or less.{" "}
          <br /> Small teams. Early journeys. What conditions are they stepping
          into?
        </p>
      </>
    ),
  },
];

function FindingCard({ finding }: { finding: Finding }) {
  const {
    question,
    body,
    image,
    illustration,
    illustrationAfter,
    placement,
    cardBeside,
    illustrationClass = "",
    noteClass = "",
    cardClass = "",
  } = finding;

  return (
    <li className={`relative ${placement}`}>
      <article
        className={`flex flex-col gap-3 ${cardBeside ? "md:flex-row md:items-start md:gap-0" : ""}`}
      >
        {/* Question as a real heading for screen readers; the artwork shows it visually */}
        <h3 className="sr-only">{question}</h3>

        {/* Illustration + pinned note */}
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-end ${
            illustrationAfter ? "flex-row-reverse justify-end" : ""
          } ${cardBeside ? "md:mt-6" : ""}`}
        >
          <img
            src={illustration.src}
            alt=""
            width={illustration.width}
            height={illustration.height}
            loading="lazy"
            decoding="async"
            className={`h-auto shrink-0 select-none ${illustrationClass || "w-[clamp(5.5rem,26vw,7rem)] md:w-28 lg:w-32"}`}
          />
          <img
            src={image}
            alt=""
            width={NOTE_W}
            height={NOTE_H}
            loading="lazy"
            decoding="async"
            className={`h-auto w-[clamp(8rem,36vw,10rem)] shrink-0 select-none md:w-36 lg:w-40 ${noteClass}`}
          />
        </div>

        {/* Text card with black-outlined yellow offset block behind it */}
        <div
          className={`w-full max-w-100 shrink-0 space-y-1.5 border border-neutral-900 bg-white px-4 py-3 text-[13px] leading-6.5 shadow-[6px_6px_0_0_var(--color-brand-yellow),6px_6px_0_1px_#171717] sm:text-sm md:w-100 lg:text-base  ${
            cardBeside ? "md:-ml-2" : "md:ml-4"
          } ${cardClass}`}
        >
          {body}
        </div>
      </article>
    </li>
  );
}

export default function BuildersDemography() {
  return (
    <section
      id="findings"
      aria-labelledby="demography-heading"
      className="relative isolate overflow-hidden bg-brand bg-[url('/images/demoBg.png')] bg-cover bg-center bg-no-repeat px-4 py-14 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <header className="md:pl-[8%]">
          <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-brand-yellow font-outfit px-3.5 py-2 font-semibold text-white sm:text-xl">
            <span className="font-bold text-brand-yellow">01.</span> Builders
            Demography
          </p>
          <h2
            id="demography-heading"
            className="mt-8 font-archivo text-[clamp(2.25rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-5%] text-white"
          >
            Who are the
            <br />
            <span className="bg-[linear-gradient(transparent_60%,var(--color-brand-yellow)_60%,var(--color-brand-yellow)_92%,transparent_92%)] px-1">
              builders
            </span>
            ?
          </h2>
        </header>

        {/* Findings (the curved path comes from demoBg.png) */}
        <div className="relative mt-10 md:-mt-16 lg:-mt-24">
          <ol
            className={`relative flex flex-col gap-12 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-16 lg:gap-y-20 `}
          >
            {findings.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
