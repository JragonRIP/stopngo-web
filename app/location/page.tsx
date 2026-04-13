import Footer from "../components/Footer";
import Header from "../components/Header";
import HoursAndLocation from "../components/HoursAndLocation";
import FadeInView from "../components/FadeInView";

export default function LocationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-white/10 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <FadeInView>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sn-silver">
                Visit us
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Location and hours
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
                Drive-thru and walk-up on US 2/41 in Powers. Early opens for
                commuters and travelers.
              </p>
            </FadeInView>
          </div>
        </section>
        <HoursAndLocation />
      </main>
      <Footer />
    </>
  );
}
