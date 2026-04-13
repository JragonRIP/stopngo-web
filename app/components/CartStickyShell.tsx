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
  const showBar = count > 0 && pathname !== "/cart";

  return (
    <div className={showBar ? "pb-[5.5rem] sm:pb-24" : undefined}>
      {children}
      {showBar ? (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-sn-base/95 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(0,0,0,0.4)]"
          role="region"
          aria-label="Open cart"
        >
          <Link
            href="/cart"
            className="mx-auto flex h-12 w-full max-w-lg items-center justify-center rounded-md bg-sn-gold text-sm font-semibold text-sn-ink shadow-md transition hover:bg-[#ffc85c] active:scale-[0.99] motion-reduce:active:scale-100"
          >
            View Your Order
          </Link>
        </div>
      ) : null}
    </div>
  );
}
