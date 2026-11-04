"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ApiError, requestReport } from "../lib/api";

/** Single place to change the report file / URL. */
export const REPORT_PDF = "/state-of-innovation-report.pdf";

export default function DownloadReport({
  buttonClassName = "",
}: {
  /** @deprecated The report is now emailed by the API; kept so existing usages compile. */
  reportUrl?: string;
  buttonClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const titleId = useId();
  const descId = useId();

  const open = () => {
    setStatus("idle");
    setError("");
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

  // Auto-hide the toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 8000);
    return () => clearTimeout(t);
  }, [toast]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setError("");
    setStatus("sending");

    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      fullName: get("name"),
      role: get("role"),
      organisation: get("organisation"),
      email: get("email"),
    };

    try {
      const res = await requestReport(payload);
      form.reset();
      setStatus("idle");
      close();
      setToast(
        res?.message ||
          `Thanks! The report is on its way to ${payload.email}. Please check your spam folder if you don't see it.`,
      );
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
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

          {
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

              {error && (
                <p
                  role="alert"
                  className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="mt-12 flex justify-center sm:mt-18">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className=" cursor-pointer! border-[1.5px] h-12.5 border-[#7D2465] bg-brand px-4 py-2.5 text-sm text-white transition-colors hover:bg-brand-dark disabled:cursor-wait! disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  {status === "sending"
                    ? "Sending…"
                    : "Download the full report"}
                </button>
              </div>
            </form>
          }
        </div>
      </dialog>

      {/* Success toast */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-4 z-200 flex justify-center px-4"
      >
        {toast && (
          <div className="pointer-events-auto flex w-full max-w-md items-start gap-3 border-2 border-black bg-[#FCFCFA] px-4 py-3 text-neutral-950 shadow-[6px_6px_0_0_var(--color-brand-yellow),6px_6px_0_2px_#000] animate-[modal-in_200ms_ease-out] motion-reduce:animate-none">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-brand"
            >
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path
                d="M7.5 12.5l3 3 6-6.5"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="flex-1 text-sm leading-snug sm:text-base">{toast}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="cursor-pointer! -m-1 p-1 text-neutral-600 hover:text-neutral-950"
            >
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
