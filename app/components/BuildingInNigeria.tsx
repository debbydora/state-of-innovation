/* eslint-disable @next/next/no-img-element */
import { Card, Pie, BarList, type Bar, type Segment, MID } from "./charts";

/* ---------- Card 1: belief vs funding ---------- */

function OpportunityCard() {
  return (
    <Card title="Can you believe in the opportunity and still struggle to keep going?">
      <div className="mt-6 grid items-start gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <figure className="flex flex-col items-center text-center">
          <Pie
            label="45.2% agreed that Nigeria enables their venture to thrive"
            startDeg={-45}
            gap={1}
            segments={[
              { label: "Agreed", value: 45.2, color: "#9F1E9B" },
              {
                label: "Other",
                value: 54.8,
                color: "#F0DDEB",
                textColor: "transparent",
              },
            ]}
            className="w-[min(70vw,13rem)] lg:w-56"
          />
          <figcaption className="mt-4 max-w-md text-sm leading-relaxed font-medium sm:text-base">
            44.8% of respondents agreed that Nigeria enables their venture to
            thrive.
          </figcaption>
        </figure>

        {/* Connector: down arrow on phones; long curved arrow across the top of the pies on md+ */}
        <div
          aria-hidden="true"
          className="relative z-10 flex flex-col items-center justify-center text-xs italic text-neutral-700 md:-mx-14 md:self-start md:pt-0 lg:-mx-24"
        >
          <span className="font-medium md:translate-y-1 md:rotate-2">
            Among these builders
          </span>
          <svg
            viewBox="0 0 24 40"
            className="mt-1 h-8 w-5 md:hidden"
            fill="none"
          >
            <path
              d="M12 2v32m0 0-6-6m6 6 6-6"
              style={{ stroke: MID }}
              strokeWidth="1.5"
            />
          </svg>
          <svg
            viewBox="0 0 300 50"
            className="hidden h-auto md:block md:w-60 lg:w-70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M6 44C80 4 200 0 290 36"
              style={{ stroke: MID }}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M283.8 28.1 290 36l-9.9 1.5"
              style={{ stroke: MID }}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <figure className="flex flex-col items-center text-center">
          <Pie
            label="Among those builders, 67.5% had never raised funding"
            startDeg={-150}
            gap={1}
            segments={[
              {
                label: "Raised",
                value: 32.5,
                color: "#9F1E9B",
                textColor: "transparent",
              },
              { label: "Never raised", value: 67.5, color: "#E552E1" },
            ]}
            className="w-[min(70vw,13rem)] lg:w-56"
          />
          <figcaption className="mt-4 max-w-md text-sm leading-relaxed font-medium sm:text-base">
            Among those builders, 67.5% had never raised funding.
          </figcaption>
        </figure>
      </div>

      <p className="mt-10 text-center text-sm sm:text-base">
        Recognising an opportunity and having the resources to pursue it are
        different parts of the journey.
      </p>
    </Card>
  );
}

/* ---------- Card 2: cost factors ---------- */

const costs: Bar[] = [
  { label: "Inflation", value: 53.8, color: "#490247" },
  { label: "Electricity", value: 41.0, color: "#9F1E9B" },
  { label: "Foreign Exchange", value: 33.8, color: "#E552E1" },
];

function CostCard() {
  return (
    <Card title="What does it cost just to keep building?">
      <p className="mt-10 text-sm sm:text-xl font-medium ">
        Among the Nigerian factors affecting their work :-
      </p>

      <div className="mt-4">
        <BarList bars={costs} size="lg" />
      </div>

      <p className="my-8 mt-12 text-center font-medium text-sm sm:text-base">
        Before the next customer or funding round, there is still a working day
        to finance
      </p>
    </Card>
  );
}

/* ---------- Card 3: relocation donut ---------- */

type RelocationSegment = Segment & {
  /** Where this slice's label sits around the donut */
  labelPos: string;
  /** Put the colour square after the text (for labels on the left side) */
  squareAfter?: boolean;
};

// Slices run clockwise from 12 o'clock: No (top-right), Relocating (bottom), Maybe (top-left)
// labelPos is measured from the CHART's edge:
//   left-full  = starts at the chart's right edge   (use ml-* / -ml-* to move in/out)
//   right-full = ends at the chart's left edge      (use mr-* / -mr-* to move in/out)
const relocation: RelocationSegment[] = [
  {
    label: "No",
    value: 24.4,
    color: "#9F1E9B",
    labelPos: "left-full top-[12%] -ml-2 sm:-ml-3",
  },
  {
    label: "Would consider relocating",
    value: 51.4,
    color: "#6A0967",
    labelPos:
      "whitespace-nowrap top-full mt-3 left-1/2 -translate-x-1/2 sm:top-auto sm:mt-0 sm:translate-x-0 sm:left-full sm:bottom-[14%] sm:ml-1",
  },
  {
    label: "Maybe",
    value: 24.2,
    color: "#E552E1",
    labelPos: "right-full top-[12%] -mr-2 justify-end sm:-mr-3",
    squareAfter: true,
  },
];

function RelocationCard() {
  return (
    <Card title="Can you build for Nigeria from somewhere else?">
      <figure className="mt-6">
        {/* Side padding reserves room for the labels beside the donut */}
        {/* Side padding reserves room for the labels beside the donut.
            Phones: relocating label sits under the chart (pb-8 makes room).
            sm+: extra right padding fits "Would consider relocating" on one line. */}
        <div className="mx-auto w-fit px-16 pb-8 sm:pb-0 sm:pl-44 sm:pr-44 lg:pl-52 lg:pr-52">
          {/* Labels are positioned relative to this box, which is exactly the chart's size */}
          <div className="relative">
            <Pie
              donut
              gap={0}
              label="Would consider relocating 100%, No 24.4%, Maybe 24.2%"
              segments={relocation}
              className="w-[min(46vw,11rem)] sm:w-52 lg:w-72"
            />

            <figcaption>
              <ul className="text-[11px] leading-tight  sm:text-sm lg:text-sm">
                {relocation.map((s) => (
                  <li
                    key={s.label}
                    className={`absolute flex items-start gap-1.5 ${s.labelPos}`}
                  >
                    {!s.squareAfter && (
                      <span
                        aria-hidden="true"
                        className="mt-1 size-2.5 shrink-0 sm:size-3"
                        style={{ backgroundColor: s.color }}
                      />
                    )}
                    <span>
                      {s.label}
                      <span className="sr-only">: {s.value}%</span>
                    </span>
                    {s.squareAfter && (
                      <span
                        aria-hidden="true"
                        className="mt-1 size-2.5 shrink-0 sm:size-3"
                        style={{ backgroundColor: s.color }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </figcaption>
          </div>
        </div>
      </figure>

      <p className="mt-9 mb-10 text-center text-sm sm:text-base">
        Building a venture and exploring opportunities abroad can exist within
        the same plan.
      </p>
    </Card>
  );
}

/* ---------- Section ---------- */

export default function BuildingInNigeria() {
  return (
    <section
      id="nigeria"
      aria-labelledby="nigeria-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 md:py-20 lg:py-24"
    >
      {/* Dotted globe, top-right */}
      <img
        src="/images/world-map-dots.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-10 -top-4 -z-10 w-[clamp(10rem,30vw,27rem)] select-none opacity-70 lg:opacity-100"
      />

      <div className="mx-auto max-w-4xl">
        <header>
          <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-pale-yellow  px-4 py-1 text-base font-semibold text-neutral-900 sm:text-xl">
            <span className="font-bold text-pale-yellow!">02.</span> Building in
            Nigeria
          </p>
          <h2
            id="nigeria-heading"
            className="mt-8 max-w-2xl md:max-w-3xl lg:max-w-4xl font-archivo font-extrabold text-[clamp(1.75rem,5.5vw,3rem)] leading-[1.05] tracking-tight"
          >
            Does <span className="text-brand">Nigeria</span> help you build or
            make <br className="hidden lg:block" /> you build around it?
          </h2>
        </header>

        <div className="mt-10 flex flex-col gap-14 md:mt-12 md:gap-16 lg:gap-20">
          <OpportunityCard />

          {/* Card 2 with globe overlapping bottom-right */}
          <div className="relative pb-0 sm:pb-0">
            <CostCard />
            <img
              src="/images/globe.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-32 pointer-events-none absolute -bottom-24 -right-8 z-0  select-none sm:-bottom-12 sm:-right-6 sm:w-24 md:-right-20 md:-bottom-32 md:w-56 lg:-right-24 lg:-bottom-40  lg:w-60"
            />
          </div>

          {/* Card 3 with plane on the left and note bottom-right */}
          <div className="relative pt-0 pb-16 sm:pt-0 sm:pb-12">
            <img
              src="/images/airplane.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute -left-6 top-48 z-10 w-30 select-none sm:-left-10 sm:top-1/3 sm:w-28 md:-left-14 md:w-50 lg:-left-28 lg:w-54"
            />
            <RelocationCard />
            <img
              src="/images/staying-note.png"
              alt="What would make staying and growing from Nigeria compelling?"
              loading="lazy"
              className="absolute bottom-0 right-2 z-10 w-48 select-none sm:-bottom-6 sm:-right-4 sm:w-50 lg:-right-12 lg:w-60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
