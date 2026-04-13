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
        <section className="border-b border-white/10 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <FadeInView>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Plan your visit
              </h2>
              <p className="mt-3 max-w-xl text-lg text-white/75">
                Browse printed menu sheets or jump straight to hours and
                directions.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/menu"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-white transition duration-300 hover:border-sn-gold/50 hover:bg-white/5"
                >
                  Full menu
                </Link>
                <Link
                  href="/location"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 text-sm font-semibold text-white transition duration-300 hover:border-sn-gold/50 hover:bg-white/5"
                >
                  Location and hours
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
