"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import OrderReceiptLines from "@/app/components/OrderReceiptLines";
import { useCartStore } from "@/lib/cart";
import {
  coerceOrderNumber,
  readStoredOrderConfirmation,
  readStoredOrderNumber,
  saveOrderConfirmationAfterCheckout,
  type StoredOrderLine,
} from "@/lib/order-confirmation-storage";
import {
  extractSquareReturnIds,
  mergeSquareSuccessUrlParams,
} from "@/lib/square-success-redirect";

function fingerprintReturnIds(ids: {
  orderId: string | null;
  checkoutId: string | null;
  transactionId: string | null;
}): string {
  return [ids.orderId, ids.checkoutId, ids.transactionId]
    .filter((s): s is string => Boolean(s && s.trim()))
    .sort()
    .join("\0");
}

function parseOrderNumberFromResponse(data: unknown): number | null {
  if (!data || typeof data !== "object") return null;
  const n = (data as { orderNumber?: unknown }).orderNumber;
  if (typeof n === "number" && Number.isInteger(n) && n >= 1) return n;
  if (typeof n === "string" && n.trim() !== "") {
    const v = Math.trunc(Number(n));
    if (Number.isInteger(v) && v >= 1) return v;
  }
  return null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [receiptLines, setReceiptLines] = useState<StoredOrderLine[]>([]);
  const [receiptTotal, setReceiptTotal] = useState<number | null>(null);
  const [pickupTimeLabel, setPickupTimeLabel] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [returnIds, setReturnIds] = useState<{
    orderId: string | null;
    checkoutId: string | null;
    transactionId: string | null;
  }>({
    orderId: null,
    checkoutId: null,
    transactionId: null,
  });

  const searchKey = searchParams.toString();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const merged = mergeSquareSuccessUrlParams(
      new URLSearchParams(searchKey)
    );
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[success] Square redirect — merged query keys:",
        Object.fromEntries(merged.entries())
      );
    }
    const next = extractSquareReturnIds(merged);
    setReturnIds((prev) => {
      if (
        prev.orderId === next.orderId &&
        prev.checkoutId === next.checkoutId &&
        prev.transactionId === next.transactionId
      ) {
        return prev;
      }
      return next;
    });

    const hasReturn = Boolean(
      next.orderId || next.checkoutId || next.transactionId
    );
    const fp = fingerprintReturnIds(next);

    if (hasReturn) {
      const stored = readStoredOrderConfirmation();
      const storedN = stored ? coerceOrderNumber(stored.orderNumber) : null;
      if (
        storedN != null &&
        stored?.lookupKey &&
        stored.lookupKey === fp
      ) {
        setOrderNumber(storedN);
        setReceiptLines(stored.lines ?? []);
        setReceiptTotal(
          typeof stored.orderTotal === "number" ? stored.orderTotal : null
        );
        setPickupTimeLabel(stored.pickupTime ?? null);
      } else {
        setOrderNumber(null);
        setReceiptLines([]);
        setReceiptTotal(null);
        setPickupTimeLabel(null);
      }
    } else {
      setOrderNumber(readStoredOrderNumber());
      const stored = readStoredOrderConfirmation();
      setReceiptLines(stored?.lines ?? []);
      setReceiptTotal(
        typeof stored?.orderTotal === "number" ? stored.orderTotal : null
      );
      setPickupTimeLabel(stored?.pickupTime ?? null);
    }
  }, [searchKey]);

  const { orderId, checkoutId, transactionId } = returnIds;
  const hasSquareReturn = Boolean(orderId || checkoutId || transactionId);

  useEffect(() => {
    if (!orderId && !checkoutId && !transactionId) return;

    const lookupKey = fingerprintReturnIds({
      orderId,
      checkoutId,
      transactionId,
    });

    let cancelled = false;
    (async () => {
      setPending(true);
      for (let attempt = 0; attempt < 12; attempt++) {
        if (cancelled) return;
        try {
          const { data } = await axios.post("/api/orders", {
            orderId: orderId ?? undefined,
            checkoutId: checkoutId ?? undefined,
            paymentLinkId: checkoutId ?? undefined,
            transactionId: transactionId ?? undefined,
          });
          const num = parseOrderNumberFromResponse(data);
          if (num != null) {
            if (!cancelled) {
              saveOrderConfirmationAfterCheckout({
                orderNumber: num,
                lookupKey,
              });
              const snap = readStoredOrderConfirmation();
              setOrderNumber(num);
              setReceiptLines(snap?.lines ?? []);
              setReceiptTotal(
                typeof snap?.orderTotal === "number" ? snap.orderTotal : null
              );
              setPickupTimeLabel(snap?.pickupTime ?? null);
              clearCart();
            }
            break;
          }
        } catch (e) {
          if (axios.isAxiosError(e)) {
            const st = e.response?.status;
            if (st === 409 || st === 502 || st === 503 || st === 500) {
              await new Promise((r) => setTimeout(r, 600 + attempt * 150));
              continue;
            }
          }
          break;
        }
      }
      if (!cancelled) setPending(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [orderId, checkoutId, transactionId, clearCart]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl flex-1 px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-sn-gold">
          Thank you
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Order received! We&apos;re firing up the grill.
        </h1>
        {orderNumber != null ? (
          <div
            className="mx-auto mt-10 max-w-md rounded-2xl border-2 border-sn-gold/50 bg-black/50 px-6 py-10 shadow-lg shadow-black/40"
            role="status"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sn-silver">
              Your pickup number
            </p>
            <p className="mt-3 text-6xl font-bold tabular-nums leading-none text-sn-gold sm:text-7xl">
              #{orderNumber}
            </p>
            {pickupTimeLabel ? (
              <p className="mt-4 text-sm text-white/60">
                Pickup: {pickupTimeLabel}
              </p>
            ) : null}
          </div>
        ) : pending ? (
          <p className="mt-10 text-lg text-white/60">Confirming your order…</p>
        ) : hasSquareReturn ? (
          <p className="mt-10 text-sm text-white/50">
            We couldn&apos;t load your order number. Your payment still went
            through—show this screen or your name at the window.
          </p>
        ) : null}

        {receiptLines.length > 0 ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-black/30 px-5 py-6 text-left shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
              Your order
            </p>
            <OrderReceiptLines lines={receiptLines} className="mt-4" plain />
            {receiptTotal != null ? (
              <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-white/60">Total</span>
                <span className="font-semibold text-sn-gold">
                  ${receiptTotal.toFixed(2)}
                </span>
              </div>
            ) : null}
          </div>
        ) : orderNumber != null && !pending ? (
          <p className="mx-auto mt-8 max-w-md text-sm text-white/45">
            Item details aren&apos;t available for this order on this device.
          </p>
        ) : null}

        <p className="mt-4 text-lg text-white/70">
          See you at the window! Pull up to the drive-thru or walk up, and have
          your name and order ready.
        </p>
        <Link
          href="/order"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-8 text-sm font-semibold text-white hover:bg-white/5"
        >
          Order something else
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-white/50">
          Loading…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
