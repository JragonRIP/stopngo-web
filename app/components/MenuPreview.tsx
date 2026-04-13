import Link from "next/link";
import FadeInView from "./FadeInView";
import MenuBoard from "./MenuBoard";
import MenuJumpNav from "./MenuJumpNav";

export default function MenuPreview() {
  return (
    <section
      id="menu"
      className="relative scroll-mt-20 overflow-hidden py-14 sm:scroll-mt-24 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,176,59,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(237,28,36,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <FadeInView>
          <div className="relative max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 max-w-[3rem] bg-gradient-to-r from-transparent to-sn-gold/50" aria-hidden />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Menu
              </p>
              <span className="h-px flex-1 max-w-[3rem] bg-gradient-to-l from-transparent to-sn-gold/50" aria-hidden />
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Coffee, energy, and real food, all day.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Full in-house menu below for browsing. To customize drinks and
              meals and pay for pickup, use{" "}
              <span className="text-white/85">Order Online</span>—that menu is
              powered by Sanity and connects to checkout. Prices and items can
              change; ask at the window to confirm.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-sn-gold/70" aria-hidden />
                Sizes and prices
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-sn-red/60" aria-hidden />
                Browse here · order on Order Online
              </span>
            </div>
          </div>
        </FadeInView>

        <MenuJumpNav />

        <MenuBoard />

        <FadeInView className="mt-10 text-center sm:mt-12 sm:text-left">
          <Link
            href="/order"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-sn-gold/50 bg-sn-gold/5 px-6 text-sm font-semibold text-sn-gold shadow-sm shadow-sn-gold/5 transition duration-300 hover:border-sn-gold hover:bg-sn-gold/15 active:scale-[0.99] sm:w-auto"
          >
            Order online, customize your drink or meal
          </Link>
        </FadeInView>
      </div>
    </section>
  );
}
