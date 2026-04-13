"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { useCartStore, type CartItem } from "@/lib/cart";
import { buildPickupTimeOptions } from "@/lib/pickup-slots";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getCartTotal());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickupOptions = useMemo(() => buildPickupTimeOptions(), []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !pickupTime) {
      setError("Please fill in all fields.");
      return;
    }
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        customerName: name.trim(),
        email: email.trim(),
        pickupTime,
        cart: items.map((i: CartItem) => ({
          id: i.id,
          name: i.name,
          basePrice: i.basePrice,
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedFlavor: i.selectedFlavor,
          selectedModifiers: i.selectedModifiers,
        })),
      };
      const { data } = await axios.post<{ url?: string }>(
        "/api/checkout",
        payload
      );
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Could not start checkout.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data;
        const fromApi =
          msg &&
          typeof msg === "object" &&
          "error" in msg &&
          typeof (msg as { error: unknown }).error === "string"
            ? (msg as { error: string }).error
            : null;
        setError(
          fromApi ??
            (err.response?.status === 500
              ? "Checkout server error. Check Square credentials and redirect URL settings."
              : "Something went wrong. Try again in a moment.")
        );
      } else {
        setError("Something went wrong. Try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-lg flex-1 px-4 py-16 sm:px-6">
          <p className="text-white/70">Your cart is empty.</p>
          <Link
            href="/order"
            className="mt-4 inline-block text-sn-gold underline"
          >
            Return to menu
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-lg flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold text-white">Checkout</h1>
        <p className="mt-2 text-sm text-white/60">
          Order total:{" "}
          <span className="font-semibold text-sn-gold">
            ${total.toFixed(2)}
          </span>
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="cust-name"
              className="block text-xs font-semibold uppercase tracking-wider text-sn-silver"
            >
              Name
            </label>
            <input
              id="cust-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="mt-1.5 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2.5 text-white focus:border-sn-gold focus:outline-none focus:ring-1 focus:ring-sn-gold"
            />
          </div>
          <div>
            <label
              htmlFor="cust-email"
              className="block text-xs font-semibold uppercase tracking-wider text-sn-silver"
            >
              Email
            </label>
            <input
              id="cust-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-1.5 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2.5 text-white focus:border-sn-gold focus:outline-none focus:ring-1 focus:ring-sn-gold"
            />
          </div>
          <div>
            <label
              htmlFor="pickup"
              className="block text-xs font-semibold uppercase tracking-wider text-sn-silver"
            >
              Pickup time
            </label>
            <select
              id="pickup"
              required
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2.5 text-white focus:border-sn-gold focus:outline-none focus:ring-1 focus:ring-sn-gold"
            >
              <option value="">Select a time…</option>
              {pickupOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-white/40">
              Times shown in local format; we&apos;ll confirm at the window.
            </p>
          </div>

          {error ? (
            <p className="text-sm text-sn-red" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="h-12 flex-1 rounded-md bg-sn-gold text-sm font-semibold text-sn-ink transition hover:bg-[#ffc85c] disabled:opacity-50"
            >
              {loading ? "Redirecting…" : "Pay with Square"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="text-sm text-white/60 hover:text-white"
            >
              Back to cart
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
