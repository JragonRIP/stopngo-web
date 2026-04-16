import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FadeInView from "../components/FadeInView";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-white/10 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <FadeInView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                About us
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-[#f5ebe0] sm:text-4xl">
                Locally owned. Proudly Crimson Cup.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[#f5ebe0]/80">
                Edelweiss Coffee is an independent specialty coffee retailer in
                Iron Mountain—locally owned and operated, with two drive-thru
                windows built for busy mornings and afternoon pick-me-ups.
              </p>
            </FadeInView>
          </div>
        </section>

        <section className="border-b border-white/10 bg-black/15 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-[#f5ebe0]/85">
            <FadeInView>
              <h2 className="text-xl font-semibold text-[#f5ebe0]">
                Our coffee story
              </h2>
              <p className="mt-3">
                We proudly serve{" "}
                <strong className="font-semibold text-[#f5ebe0]">
                  Crimson Cup Coffee &amp; Tea
                </strong>
                —beans roasted in small batches in Columbus, Ohio, since 1991.
                That partnership lets us offer exceptional, consistent flavor in
                every latte, mocha, and drip coffee we pour.
              </p>
            </FadeInView>
            <FadeInView delayMs={60}>
              <h2 className="text-xl font-semibold text-[#f5ebe0]">
                Made your way
              </h2>
              <p className="mt-3">
                Every drink is made to order. Whether you want an extra shot, a
                different milk, or a custom flavor combo, we&apos;re here to
                build the cup you crave—without the corporate script.
              </p>
            </FadeInView>
            <FadeInView delayMs={120}>
              <h2 className="text-xl font-semibold text-[#f5ebe0]">
                Gift cards
              </h2>
              <p className="mt-3">
                Gift cards are available in store. Load{" "}
                <strong className="font-semibold text-sn-gold">$50 or more</strong>{" "}
                on a card and receive a{" "}
                <strong className="font-semibold text-[#f5ebe0]">
                  free regular-sized drink
                </strong>{" "}
                as our thank-you. Ask at the window for details.
              </p>
            </FadeInView>
            <FadeInView delayMs={180}>
              <div className="rounded-xl border border-sn-gold/30 bg-sn-gold/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-sn-gold">
                  Visit us
                </p>
                <p className="mt-2 text-[#f5ebe0]/90">
                  1771 South Stephenson, Iron Mountain, MI —{" "}
                  <a
                    href="tel:+19068282329"
                    className="font-semibold text-sn-gold underline-offset-2 hover:underline"
                  >
                    (906) 828-2329
                  </a>
                </p>
                <Link
                  href="/location"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-5 text-sm font-semibold text-[#f5ebe0] transition hover:border-sn-gold/50 hover:bg-white/5"
                >
                  Hours &amp; directions
                </Link>
              </div>
            </FadeInView>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
