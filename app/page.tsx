import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FadeInView from "./components/FadeInView";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="border-b border-white/10 bg-black/15 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <FadeInView>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Plan your visit
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-[#f5ebe0]/90">
                Two drive-thru lanes, Crimson Cup coffee roasted in small
                batches, and a team that knows your usual.
              </p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
                    Location
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-[#f5ebe0]/90">
                    1771 South Stephenson
                    <br />
                    Iron Mountain, MI 49801
                  </dd>
                  <p className="mt-2 text-sm text-sn-silver">
                    Next to Dickinson County Hospital, across from Walmart
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
                    Hours
                  </dt>
                  <dd className="mt-3 space-y-2 text-sm text-[#f5ebe0]/90">
                    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                      <span>Mon–Fri</span>
                      <span className="shrink-0 tabular-nums">6:30 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                      <span>Saturday</span>
                      <span className="shrink-0 tabular-nums">7:30 AM – 4:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Sunday</span>
                      <span className="shrink-0 tabular-nums">9:00 AM – 2:00 PM</span>
                    </div>
                  </dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:col-span-2 lg:col-span-1">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+19068282329"
                      className="text-lg font-semibold text-sn-gold transition hover:text-[#d4b07e]"
                    >
                      (906) 828-2329
                    </a>
                  </dd>
                  <p className="mt-3 text-sm text-sn-silver">
                    Call ahead with questions or follow us on Facebook for
                    specials and seasonal drinks.
                  </p>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/menu"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-sn-gold px-6 text-sm font-semibold text-sn-ink transition duration-300 hover:bg-[#d4b07e]"
                >
                  View Menu
                </Link>
                <Link
                  href="/order"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-[#f5ebe0] transition duration-300 hover:border-sn-gold/50 hover:bg-white/5"
                >
                  Order Online
                </Link>
                <a
                  href="https://www.facebook.com/edelweisscoffeetea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-[#f5ebe0] transition duration-300 hover:border-sn-gold/50 hover:bg-white/5"
                >
                  Facebook updates
                </a>
              </div>
            </FadeInView>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
