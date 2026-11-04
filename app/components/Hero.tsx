/* eslint-disable @next/next/no-img-element */
import Logo from "./Logo";
import DownloadReport from "./DownloadReport";

type NoteProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/** Torn-paper question note. Text is baked into the image, so alt carries it. */
function Note({ src, alt, width, height, className = "" }: NoteProps) {
  return (
    <li className={`relative shrink-0 md:absolute ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        className="h-auto w-full select-none drop-shadow-sm"
      />
    </li>
  );
}

export default function Hero() {
  return (
    <section className=" relative isolate flex min-h-dvh flex-col overflow-hidden pb-36 sm:pb-48 lg:h-dvh lg:min-h-160 lg:pb-0 bg-background bg-[url('/images/heroBg.png')] bg-cover bg-center bg-no-repeat">
      {/* Decorative newspaper scrap top-left (purely decorative) */}
      <img
        src="/images/newspaper-scrap.png"
        alt=""
        aria-hidden="true"
        width={383}
        height={255}
        decoding="async"
        className="pointer-events-none absolute left-0 top-0 z-0 w-[clamp(8rem,20vw,16rem)] h-auto select-none"
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-4 gap-y-6 px-6 pt-6 md:flex-row md:justify-center md:pt-8">
        <Logo />
        <DownloadReport buttonClassName="border-[1.5px] border-black bg-brand px-4 py-2.5 text-sm text-white transition hover:bg-brand-dark focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand md:absolute md:right-6 md:py-3 lg:right-10" />
      </header>

      {/* Headline */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-6xl px-4 text-center sm:px-6 md:mt-16 lg:mt-20">
        <h1 className="font-archivo text-[clamp(2.25rem,10vw,3.75rem)] leading-[0.95] tracking-tighter text-neutral-950 md:text-7xl lg:text-[110px]">
          What does it actually
          <br />
          take to{" "}
          <span className="inline-block bg-brand px-[0.12em] pt-[0.1em] pb-[0.01em] align-[-0.12em] leading-none">
            <span className="block -rotate-2 font-hand text-[0.9em] font-normal tracking-normal text-brand-yellow">
              build
            </span>
          </span>{" "}
          ?
        </h1>
      </div>

      {/* Torn notes — the questions the report answers.
          Phone: an in-flow scattered group under the headline.
          Tablet & desktop (md+): floated around the headline like the design. */}
      <ul
        aria-label="Questions explored in the report"
        className="relative z-10 mx-auto mt-8 flex max-w-xl flex-wrap items-start justify-center gap-x-4 gap-y-5 px-4 md:contents"
      >
        <Note
          src="/images/who-is-building.png"
          alt="Who is building?"
          width={294}
          height={134}
          className="w-[40%] rotate-2 sm:w-44 md:left-[1.5%] md:top-[33%] md:w-[clamp(8rem,17vw,15rem)] md:rotate-0"
        />
        <Note
          src="/images/what-are-they-working-with.png"
          alt="What are they working with?"
          width={298}
          height={182}
          className="w-[40%] -rotate-2 sm:w-44 md:left-[8%] md:top-[49%] md:w-[clamp(8rem,17vw,15rem)] md:rotate-0"
        />
        <Note
          src="/images/what-helps-an-idea.png"
          alt="What helps an idea become something that lasts?"
          width={318}
          height={159}
          className="w-[48%] sm:w-52 md:right-[3%] md:top-[44%] md:w-[clamp(9rem,19vw,17rem)]"
        />
      </ul>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
        <p className="mx-auto mt-8 max-w-lg text-base leading-7 font-medium sm:leading-8 md:mt-12 md:text-lg lg:mt-20 lg:max-w-2xl lg:text-xl">
          We asked people building products, businesses and research projects
          across Nigeria what it takes to start—and what helps them keep going.
        </p>

        <p className="mt-8 inline-flex flex-col items-center gap-1 text-sm font-medium md:mt-16 lg:mt-32">
          Explore the findings
          <svg
            aria-hidden="true"
            width="14"
            height="20"
            className="mt-2"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" fill="#121211" />
            <path
              d="M2 6L7 11L12 6L14 7L7 14L0 7L2 6Z"
              fill="#121211"
              fillOpacity="0.6"
            />
            <path
              d="M2 12L7 17L12 12L14 13L7 20L0 13L2 12Z"
              fill="#121211"
              fillOpacity="0.2"
            />
          </svg>
        </p>
      </div>

      {/* Bottom collage */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-end justify-between">
        <div className="flex items-end">
          <img
            src="/images/elders.png"
            alt=""
            aria-hidden
            className="w-28 sm:w-36 md:w-60 lg:w-72"
          />
          <img
            src="/images/potter.png"
            alt=""
            aria-hidden
            className="-ml-2 md:-ml-4 w-20 sm:w-36 md:w-56  sm:block lg:w-72"
          />
          <img
            src="/images/hawker.png"
            alt=""
            aria-hidden
            className="w-20 -ml-6 md:block md:w-36 lg:w-auto md:-ml-14"
          />
        </div>
        <div className="flex items-end">
          <img
            src="/images/danfo-bus.png"
            alt=""
            aria-hidden
            className="sm:relative z-10 w-24 -mb-4 -mr-3  sm:w-44 md:w-60 lg:w-96 sm:-mr-10 sm:-mb-10 lg:-mr-36 lg:-mb-16 "
          />
          <img
            src="/images/buildings.png"
            alt=""
            aria-hidden
            className="w-20 sm:w-40 md:w-64 sm:block lg:w-96"
          />
        </div>
      </div>
    </section>
  );
}
