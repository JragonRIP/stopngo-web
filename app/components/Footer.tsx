import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
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
          <p className="text-lg font-semibold text-white">Stop &apos;N Go 2.0</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
            Locally owned food trailer &amp; coffee in Powers, MI. Early
            mornings, bold flavors, drive-thru friendly.
          </p>
          <p className="mt-4 text-sm text-white/50">
            W3798 US 2/41, Powers, MI
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
                    className="text-sm text-white/75 transition-colors duration-200 hover:text-sn-gold"
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
                  href="https://www.facebook.com/StopNGo2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/75 transition-colors duration-200 hover:text-sn-gold"
                >
                  Facebook: @Stop N Go 2.0
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/STOP.N.GO.2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/75 transition-colors duration-200 hover:text-sn-gold"
                >
                  Instagram: @STOP.N.GO.2.0
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 text-center text-xs text-white/40 sm:px-6 sm:text-left">
        © {new Date().getFullYear()} Stop &apos;N Go 2.0. All rights reserved.
      </div>
    </footer>
  );
}
