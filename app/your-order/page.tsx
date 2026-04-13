"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import OrderReceiptLines from "@/app/components/OrderReceiptLines";
import {
  coerceOrderNumber,
  readStoredOrderConfirmation,
  type StoredOrderConfirmation,
} from "@/lib/order-confirmation-storage";

export default function YourOrderPage() {
  const [stored, setStored] = useState<StoredOrderConfirmation | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStored(readStoredOrderConfirmation());
    setReady(true);
  }, []);

  const orderNumber = stored ? coerceOrderNumber(stored.orderNumber) : null;
  const lines = stored?.lines ?? [];
  const hasReceipt = lines.length > 0;
  const total =
    typeof stored?.orderTotal === "number" ? stored.orderTotal : null;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold text-white">Your order</h1>
        <p className="mt-2 text-sm text-white/60">
          Pickup number and items from your last checkout on this device.
        </p>

        {!ready ? (
          <p className="mt-10 text-white/50">Loading…</p>
        ) : orderNumber == null ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 px-6 py-10 text-center">
            <p className="text-white/70">
              No order saved yet. After you pay with Square, your pickup number
              and order details will show up here and on the confirmation page.
            </p>
            <Link
              href="/order"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-sn-gold px-8 text-sm font-semibold text-sn-ink transition hover:bg-[#ffc85c]"
            >
              Order online
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border-2 border-sn-gold/50 bg-black/50 px-6 py-8 text-center shadow-lg shadow-black/40">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sn-silver">
                Your pickup number
              </p>
              <p className="mt-3 text-5xl font-bold tabular-nums leading-none text-sn-gold sm:text-6xl">
                #{orderNumber}
              </p>
              {stored?.pickupTime ? (
                <p className="mt-4 text-sm text-white/60">
                  Pickup: {stored.pickupTime}
                </p>
              ) : null}
            </div>

            {hasReceipt ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
                  What you ordered
                </p>
                <OrderReceiptLines lines={lines} className="mt-4" plain />
                {total != null ? (
                  <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-sm">
                    <span className="text-white/60">Total</span>
                    <span className="font-semibold text-sn-gold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-white/45">
                We don&apos;t have the item list for this order on this device
                (for example, if the order was placed before this feature or in
                another browser).
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/success"
                className="inline-flex h-12 items-center justify-center rounded-md bg-sn-gold px-8 text-sm font-semibold text-sn-ink transition hover:bg-[#ffc85c]"
              >
                Open confirmation page
              </Link>
              <Link
                href="/cart"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-8 text-sm font-semibold text-white hover:bg-white/5"
              >
                Back to cart
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
