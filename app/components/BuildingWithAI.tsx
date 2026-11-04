/* eslint-disable @next/next/no-img-element */
import { Card, Pie, BarList, type Bar } from "./charts";
import { PeopleChart } from "./AnimatedCharts";

/* ---------- Card 1: 9 out of 10 use AI ---------- */

function AdoptionCard() {
  const users = 9;
  const total = 10;

  return (
    <Card title="Has AI become part of the team?">
      <figure className="mt-8 ">
        <PeopleChart
          filled={users}
          total={total}
          label={`${users} out of ${total} surveyed builders use AI`}
          className="mt-16 grid w-full grid-cols-10 gap-1 sm:gap-2 lg:gap-3"
        />
        <figcaption className="mt-6 text-center text-sm  sm:text-lg">
          <strong>{users}</strong> out of <strong>{total}</strong> surveyed
          builders use AI
        </figcaption>
      </figure>

      <p className="mt-8 text-center text-sm sm:text-base">
        Among these users, <strong>74.1%</strong> used it daily. For an
        ecosystem of small teams, that puts AI inside the everyday work of
        building.
      </p>
    </Card>
  );
}

/* ---------- Card 2: what AI is used for ---------- */

const uses: Bar[] = [
  { label: "Research", value: 84.5, color: "#6A0967" },
  { label: "Coding", value: 61.4, color: "#9F1E9B" },
  { label: "Learning", value: 58.1, color: "#E552E1" },
  // Pale bar: darker value text so it stays readable on white
  { label: "Design", value: 55.1, color: "#FCA8FF", valueColor: "#6A0967" },
];

function UsesCard() {
  return (
    <Card title="Is everyone coding—or is everyone researching?">
      <p className="mt-10 text-sm font-medium sm:text-xl">
        Among AI-using builders:
      </p>
      <div className="mt-4">
        <BarList bars={uses} />
      </div>
      <p className="mt-10 text-center text-sm font-medium sm:text-base">
        The AI story reaches across the tasks a venture needs to get through.
      </p>
    </Card>
  );
}

/* ---------- Card 3: trust in AI output ---------- */

function TrustCard() {
  return (
    <Card title="Would you trust what you use every day?">
      <figure className="mt-8 flex flex-col items-center text-center">
        <Pie
          label="43.4% rated their trust in AI outputs at 3 or below out of 5"
          startDeg={0}
          gap={1}
          segments={[
            { label: "Low trust", value: 43.4, color: "#9F1E9B" },
            {
              label: "Higher trust",
              value: 56.6,
              color: "#F0DDEB",
              textColor: "transparent",
            },
          ]}
          className="w-[min(70vw,14rem)] lg:w-64"
        />
        <figcaption className="mt-4 max-w-md text-sm font-medium sm:text-base">
          Rated their trust in AI outputs at{" "}
          <strong>3 or below out of 5</strong>.
        </figcaption>
      </figure>

      <p className="mx-auto mt-8 mb-8 max-w-lg text-center text-sm sm:text-base">
        Using AI frequently still leaves the builder responsible for deciding
        whether its output is good enough.
      </p>
    </Card>
  );
}

/* ---------- Section ---------- */

export default function BuildingWithAI() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="relative isolate overflow-hidden bg-brand bg-[url('/images/AiBg.png')] bg-cover bg-center px-4 py-14 sm:px-6 md:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-4xl">
        {/* Hourglass, top-right of the heading */}
        <img
          src="/images/hourglass.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute top-28 md:top-12 lg:top-6 -right-6 w-28 select-none sm:w-24 md:-right-12  md:w-50 lg:-right-16 lg:w-56 z-10"
        />

        <header className="pr-16 sm:pr-24 md:pr-0">
          <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-brand-yellow px-3 py-1 text-base font-semibold text-white sm:text-xl">
            <span className="font-bold text-brand-yellow">03.</span> Building
            with AI
          </p>
          <h2
            id="ai-heading"
            className="mt-8 max-w-2xl font-archivo text-[clamp(1.75rem,5.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white"
          >
            If everyone has <span className="text-brand-yellow">AI</span>, who
            has the <span className="text-brand-yellow">advantage</span>?
          </h2>
        </header>

        <div className="mt-10 flex flex-col gap-14 md:mt-12 md:gap-16 lg:gap-20">
          <AdoptionCard />
          <UsesCard />

          {/* Card 3 with robot hand bottom-left and question note right */}
          <div className="relative pb-24 sm:pb-16 md:pb-0">
            <TrustCard />
            <img
              src="/images/robot-hand.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute -bottom-14 -left-4 z-10 w-26 select-none sm:w-32 md:-bottom-20 md:-left-10 lg:left-[-19.2rem] lg:-bottom-24 lg:w-44"
            />
            <img
              src="/images/ai-note.png"
              alt="What happens when producing something becomes easier than assessing it?"
              loading="lazy"
              className="absolute top-42 -right-4 z-10 w-24 select-none sm:top-0 sm:w-40 md:bottom-auto md:top-1/2 md:-right-6 md:-translate-y-1/2 lg:-right-14 lg:w-44"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
