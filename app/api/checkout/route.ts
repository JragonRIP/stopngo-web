import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { SquareError } from "square";
import {
  getSquareCheckoutDebugSnapshot,
  getSquareClient,
  getSquareLocationId,
} from "@/lib/square-client";

export const runtime = "nodejs";

type Modifier = { name: string; price: number };

type CartLine = {
  name: string;
  basePrice: number;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  selectedModifiers: Modifier[];
};

type Body = {
  customerName?: string;
  email?: string;
  pickupTime?: string;
  cart?: CartLine[];
};

function lineNote(line: CartLine) {
  const parts: string[] = [];
  if (line.selectedSize) parts.push(`Size: ${line.selectedSize}`);
  if (line.selectedFlavor) parts.push(`Flavor: ${line.selectedFlavor}`);
  for (const m of line.selectedModifiers) {
    parts.push(m.name);
  }
  return parts.length ? parts.join(" · ") : undefined;
}

function logSquareCheckoutDebug() {
  const enabled =
    process.env.NODE_ENV === "development" ||
    process.env.CHECKOUT_DEBUG_LOG === "1";
  if (!enabled) return;

  const snap = getSquareCheckoutDebugSnapshot();
  console.log("[api/checkout] Square debug — raw process.env (location):", {
    SQUARE_LOCATION_ID: snap.env.SQUARE_LOCATION_ID,
    SQUARE_SANDBOX_LOCATION_ID: snap.env.SQUARE_SANDBOX_LOCATION_ID,
    SQUARE_PRODUCTION_LOCATION_ID: snap.env.SQUARE_PRODUCTION_LOCATION_ID,
    SQUARE_ENVIRONMENT: snap.env.SQUARE_ENVIRONMENT,
  });
  console.log("[api/checkout] Square debug — raw process.env (token):", {
    SQUARE_ACCESS_TOKEN: snap.env.SQUARE_ACCESS_TOKEN,
    SQUARE_SANDBOX_ACCESS_TOKEN: snap.env.SQUARE_SANDBOX_ACCESS_TOKEN,
    SQUARE_PRODUCTION_ACCESS_TOKEN: snap.env.SQUARE_PRODUCTION_ACCESS_TOKEN,
  });
  console.log("[api/checkout] Square debug — resolved for this request:", {
    resolvedLocationId: snap.resolvedLocationId,
    resolvedAccessToken: snap.resolvedAccessToken,
  });
}

export async function POST(request: Request) {
  logSquareCheckoutDebug();

  const locationId = getSquareLocationId();
  const client = getSquareClient();
  if (!client || !locationId) {
    return NextResponse.json(
      { error: "Square is not configured." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const customerName = body.customerName?.trim();
  const email = body.email?.trim();
  const pickupTime = body.pickupTime?.trim();
  const cart = body.cart;

  if (!customerName || !email || !pickupTime || !Array.isArray(cart)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!cart.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const lineItems: Array<{
    name: string;
    quantity: string;
    note?: string;
    basePriceMoney: { amount: bigint; currency: "USD" };
  }> = [];

  for (const line of cart) {
    const modifiers = Array.isArray(line.selectedModifiers)
      ? line.selectedModifiers
      : [];
    const modSum = modifiers.reduce(
      (s, m) => s + (typeof m.price === "number" ? m.price : 0),
      0
    );
    const unit = line.basePrice + modSum;
    const unitCents = Math.round(unit * 100);
    if (unitCents < 50) {
      return NextResponse.json(
        { error: "Each item must be at least $0.50." },
        { status: 400 }
      );
    }
    const note = lineNote(line);
    lineItems.push({
      name: (line.name && String(line.name).trim()) || "Item",
      quantity: String(Math.min(99, Math.max(1, Math.floor(line.quantity)))),
      ...(note ? { note: note.slice(0, 2000) } : {}),
      basePriceMoney: {
        amount: BigInt(unitCents),
        currency: "USD",
      },
    });
  }

  const merchantSupportEmail =
    process.env.MERCHANT_SUPPORT_EMAIL?.trim() || undefined;

  try {
    const res = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      description: `Pickup ${pickupTime}`,
      order: {
        locationId,
        metadata: {
          customerName,
          customerEmail: email,
          pickupTime,
        },
        lineItems,
      },
      checkoutOptions: {
        redirectUrl: `${origin}/success`,
        merchantSupportEmail,
      },
      prePopulatedData: {
        buyerEmail: email,
      },
    });

    const pl = res.paymentLink;
    const url = pl?.url;
    if (!url || !pl?.id || typeof pl.version !== "number") {
      return NextResponse.json(
        { error: "No checkout URL returned." },
        { status: 500 }
      );
    }

    const squareOrderId =
      (pl.orderId && pl.orderId.trim()) ||
      res.relatedResources?.orders?.find((o) => Boolean(o.id?.trim()))?.id?.trim() ||
      null;

    if (squareOrderId) {
      const redirectWithOrder = `${origin}/success?squareOrderId=${encodeURIComponent(squareOrderId)}`;
      try {
        await client.checkout.paymentLinks.update({
          id: pl.id,
          paymentLink: {
            version: pl.version,
            checkoutOptions: {
              redirectUrl: redirectWithOrder,
              merchantSupportEmail,
            },
          },
        });
      } catch (patchErr) {
        console.error(
          "[api/checkout] Could not update payment link redirectUrl with squareOrderId:",
          patchErr
        );
      }
    } else {
      console.warn(
        "[api/checkout] No Square order id on create response; redirect will not include squareOrderId."
      );
    }

    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    if (e instanceof SquareError) {
      const first = e.errors[0] as { detail?: string; code?: string } | undefined;
      const detail =
        (first?.detail && String(first.detail)) ||
        (first?.code && `Square: ${first.code}`) ||
        e.message;
      return NextResponse.json(
        { error: detail.slice(0, 500) },
        { status: e.statusCode && e.statusCode >= 400 && e.statusCode < 600 ? e.statusCode : 502 }
      );
    }
    return NextResponse.json(
      { error: "Checkout failed." },
      { status: 500 }
    );
  }
}
