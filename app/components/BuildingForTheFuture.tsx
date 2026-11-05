/* eslint-disable @next/next/no-img-element */
import ExpertsCarousel, { Expert } from "./ExpertsCarousel";
import DownloadReport, { REPORT_PDF } from "./DownloadReport";

// Quote cards are ready-made images in /public/images
const EXPERTS: Expert[] = [
  {
    name: "Solomon Ayodele",
    quote:
      "By 2030, innovation should be felt in everyday lives, with fewer basic problems left for builders to work around.",
    image: "solomon-ayodele.png",
  },
  {
    name: "Rosemond Phil-Othihiwa",
    quote:
      "By 2030, founders and government should be designing a more predictable business environment together.",
    image: "rosemond-phil-othihiwa.png",
  },
  {
    name: "Kilan David",
    quote:
      "Some of the strongest technology opportunities will come from solving basic problems in industries receiving less attention.",
    image: "kilan-david.png",
  },
  {
    name: "Ugonna Ginigeme",
    quote:
      "E-commerce could become one of technology's biggest sectors, with Feegor helping lead its growth across Africa.",
    image: "ugonna-ginigeme.png",
  },
  {
    name: "Solomon King",
    quote:
      "Investors must back future possibilities with their time, conviction and money.",
    image: "solomon-king.png",
  },
  {
    name: "Babatunde Mumuni",
    quote:
      "Banking will increasingly happen within the activities customers already do.",
    image: "babatunde-mumuni.png",
  },
  {
    name: "Obakore Ighomereho",
    quote:
      "Competition for Nigeria's market will intensify; founders must stay close to the people they serve.",
    image: "obakore-ighomereho.png",
  },
  {
    name: "Idowu Akinde",
    quote:
      "Hubs should be judged by how much uncertainty they help founders remove.",
    image: "idowu-akinde.png",
  },
  {
    name: "Anil Atmaramani",
    quote:
      "The next wave of investment will follow the infrastructure that opens up sectors beyond fintech.",
    image: "anil-atmaramani.png",
  },
  {
    name: "Ruth Okoli",
    quote:
      "More professionals will turn their expertise into online businesses, with AI helping them produce and deliver faster.",
    image: "ruth-okoli.png",
  },
];

type FutureCard = {
  bg: string;
  stat?: string;
  text: string;
  quote?: string;
  note: string;
};

const FUTURE_CARDS: FutureCard[] = [
  {
    bg: "#490247",
    stat: "35.1",
    text: "mentioned AI or automation in their expectations for 2030",
    note: "Their answers imagined technology supporting business operations and extending what small teams could attempt.",
  },
  {
    bg: "#E552E1",
    stat: "15.7",
    text: "mentioned global reach or international relevance in their expectations for 2030",
    note: "Builders imagined serving international customers and creating products other markets would adopt.",
  },
  {
    bg: "#6A0967",
    stat: "78.5",
    text: "selected founding their own business as a five-year ambition",
    note: "The ambition is visible. The report explores the conditions that could help people turn it into sustainable work.",
  },
  {
    bg: "#9F1E9B",
    text: "One South South respondent offered a different possibility:",
    quote: "The unicorn stops being the unit of ambition.",
    note: "Their answer imagined smaller, revenue-generating ventures growing through services and profitability.",
  },
];

// TODO: replace with real URLs.
// const VIDEO_SRC = "/videos/documentary.mp4";
// const VIDEO_POSTER = "/images/documentary-thumb.jpg";

export default function BuildingForTheFuture() {
  return (
    <section
      id="future"
      aria-labelledby="future-heading"
      className="overflow-x-clip bg-[#1D141C] px-4 pt-16 pb-14 text-white sm:px-6 sm:pb-16 md:pt-28 lg:pb-18"
    >
      {/* 07 header */}
      <div className="mx-auto max-w-5xl ">
        <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-brand-yellow px-4 py-1 text-xs font-semibold sm:text-base">
          <span className="font-bold text-brand-yellow">07.</span> Building for
          the Future
        </p>
        <h2
          id="future-heading"
          className="mt-6 font-archivo text-[clamp(1.75rem,5.5vw,3rem)] font-bold leading-[1.1] tracking-tight"
        >
          By 2030, what will count as success?
        </h2>
      </div>

      {/* 2030 cards: swipeable row on phones + tablets, 4-col grid from xl up */}
      <ul
        aria-label="Expectations for 2030"
        className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-6 sm:px-6 xl:mx-auto xl:grid xl:max-w-360 xl:grid-cols-4 xl:overflow-visible xl:px-0"
      >
        {FUTURE_CARDS.map((c, i) => (
          <li
            key={i}
            className="flex w-[78%] max-w-[20rem] shrink-0 snap-center flex-col justify-between gap-6 rounded-3xl p-5 text-white sm:w-[45%] sm:max-w-sm sm:gap-8 sm:p-6 xl:w-auto xl:max-w-none xl:gap-10 xl:rounded-4xl xl:p-7"
            style={{
              background: `repeating-linear-gradient(135deg, transparent 0 40px, rgba(255,255,255,0.03) 40px 80px), ${c.bg}`,
            }}
          >
            <div>
              {c.stat ? (
                <>
                  <p className="font-archivo text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl xl:text-7xl">
                    {c.stat}
                    <span className="text-3xl sm:text-4xl xl:text-5xl">%</span>
                  </p>
                  <p className="mt-3 text-sm leading-snug sm:text-base xl:text-lg">
                    {c.text}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm leading-snug sm:text-base xl:text-lg">
                    {c.text}
                  </p>
                  <blockquote className="mt-4 text-sm font-bold leading-snug sm:mt-6 sm:text-base xl:text-lg">
                    &ldquo;{c.quote}&rdquo;
                  </blockquote>
                </>
              )}
            </div>
            <p className="mr-2 mb-2 border-2 border-black bg-[#FCFCFA] px-3 py-2.5 text-xs leading-relaxed text-neutral-900 shadow-[6px_6px_0_0_var(--color-brand-yellow),6px_6px_0_2px_#000] sm:px-4 sm:py-3 sm:text-sm xl:text-base xl:shadow-[8px_8px_0_0_var(--color-brand-yellow),8px_8px_0_2px_#000]">
              {c.note}
            </p>
          </li>
        ))}
      </ul>

      {/* Experts */}
      <div className="mt-20 md:mt-28">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 sm:gap-6 lg:justify-start">
          <h3 className="min-w-0 font-archivo text-[clamp(1.5rem,4.5vw,3rem)] font-bold leading-tight">
            We also spoke to leading{" "}
            <span className="text-brand-yellow">experts</span>
          </h3>
          <img
            src="/images/lightbulb.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-10 shrink-0 sm:w-16 lg:ml-10 lg:w-24 lg:self-end"
          />
        </div>
        <div className="-mx-4 sm:-mx-6">
          <ExpertsCarousel experts={EXPERTS} />
        </div>
      </div>

      {/* Documentary — clicking play zooms the video to full screen */}
      {/* <div className="mx-auto mt-16 max-w-4xl sm:mt-20 md:mt-32">
        <h3 className="font-archivo text-[clamp(1.5rem,4.5vw,3rem)] font-bold leading-tight">
          Watch the full documentary below
        </h3>
        <div className="relative mt-8 px-4">
          <img
            src="/images/yellowStar.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute -top-6 right-0 w-12 sm:-top-8 sm:w-16 lg:w-20"
          />

          <img
            src="/images/purpleStar.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute -bottom-6 left-0  w-12 sm:-bottom-8 sm:w-16 lg:w-20"
          />

          <FullscreenVideo
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            title="State of Innovation documentary"
          />
        </div>
      </div> */}

      {/* CTA — diagonal bands come from behindBg.png */}
      <div className="relative -mx-4 mt-8 sm:mt-24 bg-[#1D141C] bg-[url('/images/behindBg.png')] bg-cover bg-center bg-no-repeat px-4 py-16 sm:-mx-6 sm:px-6 md:mt-32 md:py-24 lg:py-28 mb-32">
        <div className="relative mx-auto max-w-4xl">
          <div className="border-2 relative  z-10 border-black bg-[#F9F7FA] px-5 py-10 text-center text-neutral-950 shadow-[8px_8px_0_0_var(--color-brand-yellow),8px_8px_0_2px_#000] sm:px-12 sm:py-16 lg:py-20">
            <h3 className="font-archivo text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-tight">
              There&rsquo;s{" "}
              <span className="font-hand font-bold text-brand-light">more</span>{" "}
              behind the numbers
            </h3>
            <p className="mx-auto md:-mt-2 max-w-4xl text-sm leading-relaxed sm:text-base">
              Explore what builders are working with, what helps them move
              forward and what it takes to keep going.
            </p>

            <div className="relative mt-10 inline-flex sm:mt-12">
              {/* Curved arrow pointing at the button */}
              <svg
                viewBox="0 0 100 70"
                aria-hidden="true"
                fill="none"
                className="absolute top-[-55%] right-full mr-3 hidden w-20 sm:block lg:w-24"
              >
                <path
                  d="M4 4c14 34 40 54 86 58"
                  style={{ stroke: "var(--brand-dark)" }}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M78 52l13 10-14 6"
                  style={{ stroke: "var(--brand-dark)" }}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <DownloadReport
                reportUrl={REPORT_PDF}
                buttonClassName="cursor-pointer! inline-flex  items-center justify-center border-2 border-black bg-brand px-5 py-3 text-sm text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:px-6 sm:py-4 sm:text-base"
              />
            </div>
          </div>

          <img
            src="/images/purpleStar.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute -top-10 z-0 -right-4 w-20 sm:-top-14 sm:-right-12 sm:w-28 lg:w-36"
          />
          <img
            src="/images/mirrorHand.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute z-10 -bottom-6 -right-10 w-12 sm:-bottom-8 sm:w-16 md:w-28 lg:w-36"
          />
        </div>
      </div>
    </section>
  );
}
