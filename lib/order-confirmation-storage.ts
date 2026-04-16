/**
 * Last completed order (pickup # + receipt lines) for /success and /your-order.
 * Cart is cleared after confirmation; lines are merged from a pre-checkout session snapshot.
 */

export const ORDER_CONFIRMATION_LS_KEY = "edelweiss_order_confirmation";
export const PENDING_CHECKOUT_SESSION_KEY = "edelweiss_pending_checkout";

export type StoredOrderLine = {
  name: string;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  selectedModifiers: { name: string; price: number }[];
  lineTotal: number;
};

export type StoredOrderConfirmation = {
  orderNumber?: number | string;
  lookupKey?: string | null;
  updatedAt?: string;
  lines?: StoredOrderLine[];
  pickupTime?: string;
  customerName?: string;
  customerEmail?: string;
  orderTotal?: number;
};

export type PendingCheckoutPayload = {
  v: 1;
  cart: Array<{
    name: string;
    quantity: number;
    basePrice: number;
    selectedSize?: string;
    selectedFlavor?: string;
    selectedModifiers: { name: string; price: number }[];
    calculatedItemTotal: number;
  }>;
  pickupTime: string;
  customerName: string;
  customerEmail: string;
};

function cartToStoredLines(
  cart: PendingCheckoutPayload["cart"]
): StoredOrderLine[] {
  return cart.map((line) => ({
    name: line.name,
    quantity: line.quantity,
    selectedSize: line.selectedSize,
    selectedFlavor: line.selectedFlavor,
    selectedModifiers: line.selectedModifiers ?? [],
    lineTotal: line.calculatedItemTotal,
  }));
}

export function writePendingCheckout(payload: Omit<PendingCheckoutPayload, "v">) {
  if (typeof window === "undefined") return;
  const full: PendingCheckoutPayload = { v: 1, ...payload };
  sessionStorage.setItem(PENDING_CHECKOUT_SESSION_KEY, JSON.stringify(full));
}

export function readPendingCheckout(): PendingCheckoutPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_CHECKOUT_SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PendingCheckoutPayload;
    if (data?.v !== 1 || !Array.isArray(data.cart)) return null;
    return data;
  } catch {
    return null;
  }
}

export function clearPendingCheckout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_CHECKOUT_SESSION_KEY);
}

export function readStoredOrderConfirmation(): StoredOrderConfirmation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ORDER_CONFIRMATION_LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredOrderConfirmation;
  } catch {
    return null;
  }
}

export function writeStoredOrderConfirmation(payload: StoredOrderConfirmation) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDER_CONFIRMATION_LS_KEY, JSON.stringify(payload));
}

/** Call after Square return when pickup # is known; merges session cart snapshot into localStorage. */
export function saveOrderConfirmationAfterCheckout(params: {
  orderNumber: number;
  lookupKey: string | null;
}) {
  const pending = readPendingCheckout();
  const lines = pending?.cart?.length
    ? cartToStoredLines(pending.cart)
    : undefined;
  const orderTotal = lines?.length
    ? Math.round(lines.reduce((s, l) => s + l.lineTotal, 0) * 100) / 100
    : undefined;

  writeStoredOrderConfirmation({
    orderNumber: params.orderNumber,
    lookupKey: params.lookupKey || null,
    updatedAt: new Date().toISOString(),
    lines,
    pickupTime: pending?.pickupTime,
    customerName: pending?.customerName,
    customerEmail: pending?.customerEmail,
    orderTotal,
  });
  clearPendingCheckout();
}

export function coerceOrderNumber(
  raw: number | string | undefined
): number | null {
  const n =
    typeof raw === "number"
      ? raw
      : typeof raw === "string"
        ? Number(raw)
        : NaN;
  return Number.isInteger(n) && n >= 1 ? n : null;
}

export function readStoredOrderNumber(): number | null {
  const v = readStoredOrderConfirmation();
  if (!v) return null;
  return coerceOrderNumber(v.orderNumber);
}
