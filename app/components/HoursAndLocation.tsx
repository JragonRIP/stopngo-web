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
              <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Visit the window
              </p>
              <address className="mt-6 not-italic text-base leading-relaxed text-white/80 sm:text-lg">
                W3798 US 2/41
                <br />
                Powers, MI
              </address>
              <p className="mt-4 text-sm leading-relaxed text-sn-silver">
                Drive-thru and walk-up. Pull in and we&apos;ll take it from
                there.
              </p>
            </div>
          </FadeInView>
          <FadeInView delayMs={80}>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Hours
              </h2>
              <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Built for early risers
              </p>
              <ul className="mt-6 space-y-3 text-white/85">
                <li className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Monday through Friday</span>
                  <span className="shrink-0 text-white sm:text-right">
                    4:30 AM to 4:00 PM
                  </span>
                </li>
                <li className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Saturday</span>
                  <span className="shrink-0 text-white sm:text-right">
                    6:00 AM to 1:00 PM
                  </span>
                </li>
                <li className="flex flex-col gap-1 pb-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Sunday</span>
                  <span className="shrink-0 text-sn-silver sm:text-right">
                    Closed
                  </span>
                </li>
              </ul>
              <div className="mt-8 rounded-xl border border-sn-gold/35 bg-sn-gold/5 p-5 transition-colors duration-300 hover:border-sn-gold/45">
                <p className="text-sm font-semibold text-sn-gold">
                  Early bird advantage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  We open at <span className="text-white">4:30 AM</span> on
                  weekdays. Beat the line, grab your Lotus or espresso, and get
                  on the road before the sun is up.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
