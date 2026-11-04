/* eslint-disable @next/next/no-img-element */

export default function BuildersIndex() {
  return (
    <section
      id="index"
      aria-labelledby="index-heading"
      className="bg-[#1D141C] px-4 pt-16 pb-10 sm:px-6 md:pt-24 lg:pt-28"
    >
      <div className="relative mx-auto max-w-3xl">
        <article className="relative border-2 border-black bg-[#FCFCFA] px-5 pt-10 pb-8 text-center shadow-[8px_8px_0_0_var(--color-brand-yellow)] sm:px-10 sm:pt-16 sm:pb-10">
          <p className="inline-flex items-center gap-1.5 rounded-[36px] border border-brand-yellow px-4 py-1 text-xs font-semibold text-neutral-900 sm:text-base">
            <span className="font-bold text-brand-yellow">06.</span> The
            Builder&rsquo;s Index
          </p>
          <h2
            id="index-heading"
            className="mx-auto mt-10 max-w-2xl font-archivo text-[clamp(1.5rem,4.5vw,3rem)] font-bold leading-[100%] tracking-tight "
          >
            How would we know building is getting better?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed mb-6 sm:text-base">
            For 2026, we have a starting point: <strong>54.0 out of 100</strong>
            . The Builder&rsquo;s Index brings together five aspects of the
            building experience. Future editions will help show where
            conditions, support and progress are changing—and where another year
            has passed without enough movement.
          </p>
        </article>

        {/* Question-mark sticker, top-right */}
        <img
          src="/images/question-mark.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -top-10 -right-8 w-32 select-none sm:-top-12 sm:right-4 sm:w-20 md:-right-4 md:w-40 lg:w-44"
        />
      </div>
    </section>
  );
}
