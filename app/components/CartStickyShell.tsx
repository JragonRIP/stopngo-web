"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getCartItemCount, useCartStore } from "@/lib/cart";

/**
 * Adds bottom padding when the cart has items so content isn’t hidden behind
 * the fixed “View Your Order” bar (Order Online / any page that uses the cart).
 */
export default function CartStickyShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const count = getCartItemCount(items);
  const hideSticky = pathname === "/cart" || pathname === "/checkout";
  const showBar = count > 0 && !hideSticky;

  return (
    <div className={showBar ? "pb-20 sm:pb-24" : undefined}>
      {children}
      {showBar ? (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
          role="region"
          aria-label="Open cart"
        >
          <Link
            href="/cart"
            className="pointer-events-auto flex h-12 w-full max-w-lg items-center justify-center rounded-md bg-sn-gold text-sm font-semibold text-sn-ink shadow-lg shadow-black/30 transition hover:bg-[#ffc85c] active:scale-[0.99] motion-reduce:active:scale-100"
          >
            View Your Order
          </Link>
        </div>
      ) : null}
    </div>
  );
}
