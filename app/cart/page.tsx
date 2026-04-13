"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { useCartStore } from "@/lib/cart";

function formatSize(s?: string) {
  if (!s) return null;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.getCartTotal());

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold text-white">Your cart</h1>
        <p className="mt-2 text-sm text-white/60">
          Review items before checkout. Modifiers are listed under each
          product.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-lg border border-white/10 bg-black/25 p-8 text-center">
            <p className="text-white/70">Your cart is empty.</p>
            <Link
              href="/order"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-sn-gold px-6 text-sm font-semibold text-sn-ink"
            >
              Browse menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {items.map((line) => (
                <li key={line.id} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{line.name}</p>
                    <ul className="mt-2 space-y-0.5 text-sm text-white/55">
                      {formatSize(line.selectedSize) ? (
                        <li>Size: {formatSize(line.selectedSize)}</li>
                      ) : null}
                      {line.selectedFlavor ? (
                        <li>Flavor: {line.selectedFlavor}</li>
                      ) : null}
                      {line.selectedModifiers.map((m) => (
                        <li key={m.name}>
                          {m.name} (+${m.price.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2 rounded-md border border-white/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-3 py-1.5 text-white/80 hover:bg-white/10"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center text-sm font-medium">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-3 py-1.5 text-white/80 hover:bg-white/10"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-sn-gold">
                      ${line.calculatedItemTotal.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      className="text-xs text-sn-red hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white/50">Subtotal</p>
                <p className="text-2xl font-semibold text-white">
                  ${total.toFixed(2)}
                </p>
              </div>
              <Link
                href="/checkout"
                className="inline-flex h-12 items-center justify-center rounded-md bg-sn-gold px-8 text-sm font-semibold text-sn-ink transition hover:bg-[#ffc85c]"
              >
                Proceed to checkout
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
