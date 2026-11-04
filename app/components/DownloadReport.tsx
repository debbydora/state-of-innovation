"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

/** Single place to change the report file / URL. */
export const REPORT_PDF = "/state-of-innovation-report.pdf";

/**
 * "Download the full report" button + lead-capture modal.
 * Uses the native <dialog> (focus trap, Esc to close, inert background).
 */
export default function DownloadReport({
  reportUrl = REPORT_PDF,
  buttonClassName = "",
}: {
  reportUrl?: string;
  buttonClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const titleId = useId();
  const descId = useId();

  const open = () => {
    setStatus("idle");
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  // Lock page scroll while open
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => (document.body.style.overflow = "");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");

    // TODO: send `data` to your backend / CRM before downloading.
    // const data = Object.fromEntries(new FormData(form));
    // await fetch("/api/leads", { method: "POST", body: JSON.stringify(data) });

    const a = document.createElement("a");
    a.href = reportUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();

    form.reset();
    setStatus("done");
  };

  const field =
    "w-full h-[50px] font-light border border-[#DCA4CD] bg-[#F7EDF4] p-4 text-sm text-[#6B335E] placeholder:text-[#6B335E] focus:border-brand focus:outline-2 focus:outline-offset-0 focus:outline-brand  sm:text-base";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          document.body.style.overflow = "hidden";
          open();
        }}
        aria-haspopup="dialog"
        className={` cursor-pointer! ${buttonClassName}`}
      >
        Download the full report
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => {
          // Click on backdrop closes
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto bg-[#FCFCFA] p-0 text-neutral-950 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[modal-in_200ms_ease-out] motion-reduce:open:animate-none"
      >
        <div className="relative px-6 pt-14 pb-10 sm:px-12 sm:pt-10 sm:pb-10">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="cursor-pointer! absolute top-4 right-4 flex size-11 items-center justify-center rounded-xl bg-[#F0DDEB] hover:bg-[#F0DDEB]  text-[#531743] transition-colors focus-visible:outline-2 focus-visible:outline-brand sm:top-5 sm:right-5"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <h2
            id={titleId}
            className="pr-10 text-[#531743] font-archivo text-[clamp(1.5rem,4.5vw,1.5rem)] font-bold leading-tight tracking-tight"
          >
            There&rsquo;s more behind the numbers
          </h2>
          <p
            id={descId}
            className="mt-3 max-w-2xl text-base leading-snug text-[#6B335E] sm:text-base"
          >
            Explore what builders are working with, what helps them move forward
            and what it takes to keep going.
          </p>

          {status === "done" ? (
            <div role="status" className="mt-12 text-center">
              <p className="font-archivo text-xl font-extrabold text-brand">
                Thank you! Your download has started.
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                If it didn&rsquo;t,{" "}
                <a
                  href={reportUrl}
                  download
                  className="font-semibold text-brand underline underline-offset-2"
                >
                  click here to download the report
                </a>
                .
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-8 border-2 border-black bg-brand px-6 py-3 text-sm text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:text-base"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-10 sm:mt-16">
              <div className="flex flex-col gap-5 sm:gap-7">
                <label className="block">
                  <span className="sr-only">Full name (required)</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Your role (required)</span>
                  <input
                    name="role"
                    type="text"
                    required
                    autoComplete="organization-title"
                    placeholder="Your Role"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Email address (required)</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Organisation (optional)</span>
                  <input
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    placeholder="Organisation (optional)"
                    className={field}
                  />
                </label>
              </div>

              <div className="mt-12 flex justify-center sm:mt-18">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className=" cursor-pointer! border-[1.5px] h-12.5 border-[#7D2465] bg-brand px-4 py-2.5 text-sm text-white transition-colors hover:bg-brand-dark disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  {status === "sending"
                    ? "Preparing download…"
                    : "Download the full report"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
