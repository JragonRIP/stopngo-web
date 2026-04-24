"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, getCartItemCount } from "@/lib/cart";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/location", label: "Location" },
];

export default function Header() {
  const items = useCartStore((s) => s.items);
  const count = getCartItemCount(items);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-sn-base/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2"
          id="top"
        >
          <Image
            src="/images/edelweiss-logo.svg"
            alt="Edelweiss Coffee"
            width={280}
            height={48}
            className="h-10 w-auto object-contain object-left sm:h-11"
            priority
          />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
          aria-label="Main"
        >
          <ul className="flex items-center gap-1 lg:gap-2">
            {nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/your-order"
            className="hidden rounded-full border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/90 transition hover:border-sn-gold/50 hover:text-sn-gold sm:inline-flex sm:items-center sm:justify-center"
          >
            Your order
          </Link>
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-sn-gold/50 hover:text-sn-gold"
            aria-label={`Shopping cart${count ? `, ${count} items` : ""}`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sn-red px-1 text-[11px] font-semibold leading-none text-white shadow-sm">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <nav
        className="flex flex-wrap justify-center gap-1 border-t border-white/5 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
        aria-label="Mobile main"
      >
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="flex min-h-11 min-w-[4.25rem] items-center justify-center rounded-lg px-3 py-2 text-center text-xs font-medium text-white/85 transition active:bg-white/10"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/your-order"
          className="flex min-h-11 min-w-[4.25rem] items-center justify-center rounded-lg px-3 py-2 text-center text-xs font-medium text-white/85 transition active:bg-white/10"
        >
          Your order
        </Link>
      </nav>
    </header>
  );
}
