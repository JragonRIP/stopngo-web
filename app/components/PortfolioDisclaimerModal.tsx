"use client";

import { useCallback, useEffect, useId, useState } from "react";

/**
 * Shown on each full visit (page load). Not persisted — refresh shows it again.
 */
export default function PortfolioDisclaimerModal() {
  const [open, setOpen] = useState(true);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/80 p-4 sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl border border-white/15 bg-sn-base px-5 py-6 shadow-2xl shadow-black/50 sm:px-7 sm:py-8"
      >
        <p
          id={titleId}
          className="text-sm font-semibold uppercase tracking-wider text-sn-gold"
        >
          Notice
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
          This site is <strong className="font-semibold text-white">not</strong>{" "}
          an official website of the business shown here. It is a design and
          development sample — a representation of the kind of websites I build.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Content and branding are used for demonstration only unless otherwise
          agreed with the business.
        </p>
        <button
          type="button"
          onClick={close}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-sn-gold text-sm font-semibold text-sn-ink transition hover:bg-[#ffc85c] active:scale-[0.99] motion-reduce:active:scale-100"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
