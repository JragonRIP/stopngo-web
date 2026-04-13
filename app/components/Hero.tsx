import Link from "next/link";
import FadeInView from "./FadeInView";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-sn-base">
      {/* Subtle animated blooms (spotlight feel); static fallback when reduced motion */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        <div
          className="sn-hero-light-1 absolute -left-[20%] top-[-15%] h-[min(85vw,520px)] w-[min(85vw,520px)] rounded-full bg-[#fbb03b] blur-[100px] motion-reduce:opacity-[0.06]"
          style={{ mixBlendMode: "soft-light" }}
        />
        <div
          className="sn-hero-light-2 absolute -right-[15%] top-[5%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-[#ed1c24] blur-[110px] motion-reduce:opacity-[0.05]"
          style={{ mixBlendMode: "soft-light" }}
        />
        <div
          className="sn-hero-light-3 absolute left-[25%] bottom-[-25%] h-[min(90vw,480px)] w-[min(90vw,480px)] rounded-full bg-[#f5e6c8] blur-[120px] motion-reduce:opacity-[0.04]"
          style={{ mixBlendMode: "overlay" }}
        />
        <div
          className="sn-hero-light-4 absolute right-[20%] top-[40%] h-[min(55vw,320px)] w-[min(55vw,320px)] rounded-full bg-[#fbb03b] blur-[90px] motion-reduce:opacity-[0.04]"
          style={{ mixBlendMode: "soft-light" }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24 lg:py-28">
        <FadeInView>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sn-silver">
            Powers, Michigan
          </p>
          <h1 className="max-w-3xl text-[1.65rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Fueling the U.P. Starting at 4:30 AM.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Drive-thru and walk-up service. Locally roasted coffee, custom Lotus
            energy infusions, and fresh Smash Burgers.
          </p>
        </FadeInView>
        <FadeInView className="mt-10" delayMs={120}>
          <div className="flex max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Link
              href="/order"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-sn-gold px-6 text-sm font-semibold text-sn-ink shadow-sm transition duration-300 hover:bg-[#ffc85c] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sn-gold sm:w-auto sm:px-8"
            >
              Order for Pickup
            </Link>
            <Link
              href="/menu"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/25 px-6 text-sm font-semibold text-white transition duration-300 hover:border-sn-silver hover:bg-white/5 active:scale-[0.99] sm:w-auto sm:px-8"
            >
              View Full Menu
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
