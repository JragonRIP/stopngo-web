import Image from "next/image";
import Link from "next/link";
import FadeInView from "./FadeInView";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-sn-base">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sn-base/88 via-sn-base/78 to-sn-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-sn-base/40 via-transparent to-sn-base/50" />
      </div>
      {/* Subtle animated blooms */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div
          className="sn-hero-light-1 absolute -left-[20%] top-[-15%] h-[min(85vw,520px)] w-[min(85vw,520px)] rounded-full bg-[#c9a068] blur-[100px] motion-reduce:opacity-[0.06]"
          style={{ mixBlendMode: "soft-light" }}
        />
        <div
          className="sn-hero-light-2 absolute -right-[15%] top-[5%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-[#9b2335] blur-[110px] motion-reduce:opacity-[0.05]"
          style={{ mixBlendMode: "soft-light" }}
        />
        <div
          className="sn-hero-light-3 absolute left-[25%] bottom-[-25%] h-[min(90vw,480px)] w-[min(90vw,480px)] rounded-full bg-[#f5ebe0] blur-[120px] motion-reduce:opacity-[0.04]"
          style={{ mixBlendMode: "overlay" }}
        />
        <div
          className="sn-hero-light-4 absolute right-[20%] top-[40%] h-[min(55vw,320px)] w-[min(55vw,320px)] rounded-full bg-[#c9a068] blur-[90px] motion-reduce:opacity-[0.04]"
          style={{ mixBlendMode: "soft-light" }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24 lg:py-28">
        <FadeInView>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sn-silver">
            Iron Mountain, Michigan
          </p>
          <h1 className="max-w-3xl text-[1.65rem] font-semibold leading-tight tracking-tight text-[#f5ebe0] sm:text-4xl md:text-5xl lg:text-6xl">
            Exceptional Coffee To-Go in Iron Mountain.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f5ebe0]/85 sm:text-lg">
            Two drive-thru windows, beans roasted fresh for Crimson Cup Coffee
            &amp; Tea, and drinks made exactly how you like them—fast, friendly,
            and full of flavor.
          </p>
        </FadeInView>
        <FadeInView className="mt-10" delayMs={120}>
          <div className="flex max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Link
              href="/menu"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-sn-gold px-6 text-sm font-semibold text-sn-ink shadow-sm transition duration-300 hover:bg-[#d4b07e] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sn-gold sm:w-auto sm:px-8"
            >
              View Menu
            </Link>
            <Link
              href="/order"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/30 bg-white/5 px-6 text-sm font-semibold text-[#f5ebe0] backdrop-blur-sm transition duration-300 hover:border-sn-gold/50 hover:bg-white/10 active:scale-[0.99] sm:w-auto sm:px-8"
            >
              Order Online
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
