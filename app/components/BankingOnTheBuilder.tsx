/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { Card, Pie, BarList, type Bar, DARK, MID, LIGHT, PALE } from "./charts";

/** Pie with a short caption beside it on sm+, below it on phones */
function PieWithCaption({
  value,
  color = "#9F1E9B",
  startDeg,
  label,
  children,
  captionBelow = false,
}: {
  value: number;
  color?: string;
  startDeg: number;
  label: string;
  children: ReactNode;
  /** Always place the caption under the chart (centred) */
  captionBelow?: boolean;
}) {
  return (
    <figure
      className={`mt-8 flex flex-col items-center gap-4 text-center ${
        captionBelow
          ? ""
          : "sm:flex-row sm:justify-center sm:gap-8 sm:text-left"
      }`}
    >
      <Pie
        label={label}
        startDeg={startDeg}
        gap={2}
        segments={[
          { label: "Highlighted", value, color },
          {
            label: "Other",
            value: Number((100 - value).toFixed(1)),
            color: "#F0DDEB",
            textColor: "transparent",
          },
        ]}
        className="w-[min(60vw,12rem)] shrink-0 lg:w-56"
      />
      <figcaption
        className={`text-base sm:text-lg ${captionBelow ? "max-w-lg" : "max-w-48"}`}
      >
        {children}
      </figcaption>
    </figure>
  );
}

/* ---------- Card 1: who pays ---------- */

const sources: Bar[] = [
  { label: "Friends & Family", value: 62.4, color: "#6A0967" },
  { label: "Reported grants", value: 42.3, color: "#9F1E9B" },
  { label: "Bank Loans", value: 5.7, color: "#E552E1", labelOutside: true },
];

function WhoPaysCard() {
  return (
    <Card title="Who pays while the business finds its feet?">
      <PieWithCaption
        value={71.7}
        startDeg={35}
        label="71.7% had never raised funding"
      >
        <strong>71.7%</strong> had never raised funding
      </PieWithCaption>

      <p className="mt-10 text-sm font-medium sm:text-lg">
        Among builders who had raised funding:
      </p>
      <div className="mt-4">
        <BarList bars={sources} />
      </div>

      <p className="mx-auto mt-10 mb-2 font-medium text-center text-sm sm:text-xl">
        The survey does not establish how many applied for loans. It raises a
        question about which financial products fit these ventures.
      </p>
    </Card>
  );
}

/* ---------- Card 2: still need funding ---------- */

/** TODO: replace with the exact question written on the note image */
const FUNDING_NOTE_TEXT =
  "Reaching one milestone introduces the cost of the next";

function StillNeedCard() {
  return (
    <Card title="You’ve raised money. Why do you still need funding?">
      <div className="pb-6">
        <PieWithCaption
          value={55.2}
          color="#9F1E9B"
          startDeg={-25}
          label="55.2% of builders who had raised money still ranked funding as their first growth need"
        >
          <strong>55.2%</strong> still ranked it as their first growth need
        </PieWithCaption>
      </div>
    </Card>
  );
}

/* ---------- Card 3: leaving the bank ---------- */

const requests: Bar[] = [
  {
    label: "Instant business account opening",
    value: 50.7,
    color: "#E552E1",
  },
  { label: "Credit without collateral", value: 43.1, color: "#9F1E9B" },
  { label: "Embedded payment APIs", value: 42.5, color: "#6A0967" },
];

function LeaveBankCard() {
  return (
    <Card title="What would make you leave your bank?">
      <PieWithCaption
        captionBelow
        value={90.7}
        startDeg={-60}
        label="90.7% said they would switch for a product designed specifically for them"
      >
        <strong>90.7%</strong> said they would switch for a product designed
        specifically for them.
      </PieWithCaption>

      <p className="mt-10 text-sm font-medium sm:text-lg">
        Their requests included:
      </p>
      <div className="mt-4">
        <BarList bars={requests} />
      </div>

      <p className="mt-10 mb-2 text-sm sm:text-base font-semibold">
        Builders want help with the work around the money too: opening an
        account, collecting payments and connecting financial services to their
        products.
      </p>
    </Card>
  );
}

/* ---------- Section ---------- */

export default function BankingOnTheBuilder() {
  return (
    <section
      id="banking"
      aria-labelledby="banking-heading"
      className="relative isolate overflow-hidden bg-brand bg-[url('/images/AiBg.png')] bg-cover bg-center px-4 py-14 sm:px-6 md:py-20 lg:py-24"
    >
      {/* Newspaper scrap, bottom-left corner */}
      <img
        src="/images/banking-newspaper.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 w-[clamp(5rem,12vw,9rem)] select-none"
      />

      <div className="relative mx-auto max-w-4xl">
        <header>
          <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-brand-yellow px-3 py-1 text-base font-semibold text-white sm:text-xl">
            <span className="font-bold text-brand-yellow">05.</span> Banking on
            the Builder
          </p>
          <h2
            id="banking-heading"
            className="mt-8 max-w-2xl font-archivo text-[clamp(1.75rem,5.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white sm:max-w-3xl"
          >
            Builders need <span className="text-brand-yellow">capital</span>.
            What else do they need from a bank?
          </h2>
        </header>

        <div className="mt-10 flex flex-col gap-14 md:mt-12 md:gap-16 lg:gap-20">
          {/* Card 1: banknote top-right, money bag left */}
          <div className="relative pt-10 md:pt-0">
            <img
              src="/images/banknote.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute -top-12 -right-10  w-32  select-none sm:w-24 md:-right-20 md:-top-30 md:w-48 lg:-right-38 lg:-top-36 lg:w-64"
            />
            <WhoPaysCard />
            <img
              src="/images/money-bag.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute -bottom-10 -left-4 z-10 w-20 select-none sm:w-28 md:bottom-auto md:top-2/3 md:-left-12 md:w-32 lg:-left-78 lg:top-3/5 lg:w-56"
            />
          </div>

          {/* Card 2 + question note bottom-right */}
          <div className="relative pb-20 sm:pb-12 md:pb-0">
            <StillNeedCard />
            <img
              src="/images/banking-note.png"
              alt={FUNDING_NOTE_TEXT}
              loading="lazy"
              className="absolute bottom-12  right-2 z-10 w-40 md:w-60 select-none sm:right-0 sm:w-44 md:-bottom-8 md:-right-6 lg:-right-14 lg:w-72"
            />
          </div>
          <LeaveBankCard />
        </div>
      </div>
    </section>
  );
}
