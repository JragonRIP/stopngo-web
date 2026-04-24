import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/cart", label: "Cart" },
  { href: "/location", label: "Location and Hours" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/35 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:justify-between">
        <div>
          <p className="text-lg font-semibold text-[#f5ebe0]">Edelweiss Coffee</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#f5ebe0]/60">
            Drive-thru specialty coffee in Iron Mountain. Crimson Cup beans,
            two lanes, and drinks crafted exactly how you like them.
          </p>
          <p className="mt-4 text-sm text-[#f5ebe0]/50">
            1771 South Stephenson, Iron Mountain, MI 49801
          </p>
          <p className="mt-1 text-sm">
            <a
              href="tel:+19068282329"
              className="text-sn-gold transition hover:text-[#d4b07e]"
            >
              (906) 828-2329
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
              Navigate
            </p>
            <ul className="mt-3 space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#f5ebe0]/75 transition-colors duration-200 hover:text-sn-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
              Social
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/edelweisscoffeetea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#f5ebe0]/75 transition-colors duration-200 hover:text-sn-gold"
                >
                  Facebook — Edelweiss Coffee &amp; Tea
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 text-center text-xs text-[#f5ebe0]/40 sm:px-6 sm:text-left">
        <p>Content © 2026 Edelweiss Coffee, Inc. All rights reserved.</p>
        <p className="mt-2 text-[#f5ebe0]/35">
          Website by Aurum Web Design — affordable, premium web design for local
          businesses.
        </p>
      </div>
    </footer>
  );
}
