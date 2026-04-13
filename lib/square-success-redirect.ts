/**
 * Square appends query parameters to checkout_options.redirect_url after payment.
 * Names vary by product/version; we accept common camelCase, snake_case, and aliases.
 *
 * @see https://developer.squareup.com/reference/square/objects/Checkout (legacy redirect behavior)
 */

/** Prefer squareOrderId first — we set it on the payment link redirect URL after create. */
const ORDER_ID_KEYS = [
  "squareOrderId",
  "square_order_id",
  "orderId",
  "order_id",
  /** Legacy / some redirects */
  "referenceId",
  "reference_id",
];

const CHECKOUT_LINK_KEYS = [
  "checkoutId",
  "checkout_id",
  "paymentLinkId",
  "payment_link_id",
  "paymentLink",
  "payment_link",
  "linkId",
  "link_id",
];

const PAYMENT_ID_KEYS = [
  "transactionId",
  "transaction_id",
  "paymentId",
  "payment_id",
];

export function pickSquareRedirectParam(
  params: URLSearchParams,
  keys: string[]
): string | null {
  for (const k of keys) {
    const v = params.get(k);
    if (v && v.trim()) return v.trim();
  }
  return null;
}

export function parseHashQueryString(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  const raw = window.location.hash.replace(/^#/, "").trim();
  if (!raw) return new URLSearchParams();
  const q = raw.includes("=")
    ? raw.startsWith("?")
      ? raw.slice(1)
      : raw
    : "";
  return new URLSearchParams(q || raw);
}

/**
 * Merge Next search params with window.location (source of truth after external redirect)
 * and optional hash query fragment.
 */
export function mergeSquareSuccessUrlParams(
  nextSearchParams: URLSearchParams
): URLSearchParams {
  const merged = new URLSearchParams();

  if (typeof window !== "undefined") {
    const w = new URLSearchParams(window.location.search);
    w.forEach((v, k) => merged.set(k, v));
  }

  nextSearchParams.forEach((v, k) => {
    if (!merged.has(k)) merged.set(k, v);
  });

  parseHashQueryString().forEach((v, k) => merged.set(k, v));

  return merged;
}

export function extractSquareReturnIds(merged: URLSearchParams): {
  orderId: string | null;
  checkoutId: string | null;
  transactionId: string | null;
} {
  return {
    orderId: pickSquareRedirectParam(merged, ORDER_ID_KEYS),
    checkoutId: pickSquareRedirectParam(merged, CHECKOUT_LINK_KEYS),
    transactionId: pickSquareRedirectParam(merged, PAYMENT_ID_KEYS),
  };
}

export { ORDER_ID_KEYS, CHECKOUT_LINK_KEYS, PAYMENT_ID_KEYS };
