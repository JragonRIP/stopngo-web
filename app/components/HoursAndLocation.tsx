import FadeInView from "./FadeInView";

export default function HoursAndLocation() {
  return (
    <section
      id="location"
      className="border-b border-white/10 bg-black/20 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Location
              </h2>
              <p className="mt-3 text-2xl font-semibold text-[#f5ebe0] sm:text-3xl">
                Two windows, zero hassle
              </p>
              <address className="mt-6 not-italic text-base leading-relaxed text-[#f5ebe0]/85 sm:text-lg">
                1771 South Stephenson
                <br />
                Iron Mountain, MI 49801
              </address>
              <p className="mt-4 text-sm leading-relaxed text-sn-silver">
                Next to Dickinson County Hospital, across from Walmart. Pull up
                to either drive-thru lane—we&apos;ll have your drink ready.
              </p>
              <p className="mt-4 text-base">
                <a
                  href="tel:+19068282329"
                  className="font-semibold text-sn-gold transition hover:text-[#d4b07e]"
                >
                  (906) 828-2329
                </a>
              </p>
            </div>
          </FadeInView>
          <FadeInView delayMs={80}>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Hours
              </h2>
              <p className="mt-3 text-2xl font-semibold text-[#f5ebe0] sm:text-3xl">
                Fresh cups all week
              </p>
              <ul className="mt-6 space-y-3 text-[#f5ebe0]/90">
                <li className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Monday through Friday</span>
                  <span className="shrink-0 tabular-nums text-[#f5ebe0] sm:text-right">
                    6:30 AM to 5:00 PM
                  </span>
                </li>
                <li className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Saturday</span>
                  <span className="shrink-0 tabular-nums text-[#f5ebe0] sm:text-right">
                    7:30 AM to 4:00 PM
                  </span>
                </li>
                <li className="flex flex-col gap-1 pb-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Sunday</span>
                  <span className="shrink-0 tabular-nums text-[#f5ebe0] sm:text-right">
                    9:00 AM to 2:00 PM
                  </span>
                </li>
              </ul>
              <div className="mt-8 rounded-xl border border-sn-gold/35 bg-sn-gold/5 p-5 transition-colors duration-300 hover:border-sn-gold/45">
                <p className="text-sm font-semibold text-sn-gold">
                  Crimson Cup Coffee &amp; Tea
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#f5ebe0]/80">
                  Beans roasted in small batches in Columbus, Ohio, since 1991—the
                  same craft-roasted coffee you taste in every cup.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
