import { Resend } from "resend";
import type { SquareClient } from "square";
import { getOrderDayTz, getSquareClient } from "@/lib/square-client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type StoredLineItem = {
  name: string;
  quantity: number;
  detail?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isSquareOrderPaid(order: Record<string, unknown> | undefined): boolean {
  if (!order) return false;
  if (order.state === "CANCELED") return false;
  if (order.state === "COMPLETED") return true;
  const due = order.netAmountDueMoney as { amount?: bigint } | undefined;
  const amt = due?.amount;
  if (amt !== undefined && amt !== null && BigInt(amt) === BigInt(0))
    return true;
  return false;
}

function lineItemsFromSquareOrder(
  order: Record<string, unknown>
): StoredLineItem[] {
  const raw = order.lineItems as
    | Array<Record<string, unknown>>
    | undefined
    | null;
  if (!raw?.length) return [];
  const out: StoredLineItem[] = [];
  for (const li of raw) {
    const name = typeof li.name === "string" ? li.name : "Item";
    const qtyStr = typeof li.quantity === "string" ? li.quantity : "1";
    const qty = Math.max(1, Math.min(99, Math.floor(Number(qtyStr) || 1)));
    const note =
      typeof li.note === "string" && li.note.trim() ? li.note.trim() : undefined;
    out.push({ name, quantity: qty, detail: note });
  }
  return out;
}

function metadataString(
  meta: Record<string, string | null | undefined> | null | undefined,
  key: string
): string {
  if (!meta) return "";
  const v = meta[key];
  return typeof v === "string" ? v.trim() : "";
}

export async function resolveSquareOrderId(
  client: SquareClient,
  params: {
    orderId?: string | null;
    checkoutId?: string | null;
    transactionId?: string | null;
  }
): Promise<{ squareOrderId: string; squarePaymentId?: string } | null> {
  const oid = params.orderId?.trim();
  if (oid) return { squareOrderId: oid };

  const checkoutId = params.checkoutId?.trim();
  if (checkoutId) {
    const res = await client.checkout.paymentLinks.get({ id: checkoutId });
    const link = res.paymentLink as Record<string, unknown> | undefined;
    const orderId =
      typeof link?.orderId === "string"
        ? link.orderId
        : typeof (link as { order_id?: string })?.order_id === "string"
          ? (link as { order_id: string }).order_id
          : "";
    if (orderId) return { squareOrderId: orderId };
  }

  const payId = params.transactionId?.trim();
  if (payId) {
    const res = await client.payments.get({ paymentId: payId });
    const pay = res.payment as Record<string, unknown> | undefined;
    const orderId = typeof pay?.orderId === "string" ? pay.orderId : "";
    if (orderId) return { squareOrderId: orderId, squarePaymentId: payId };
  }

  return null;
}

async function sendOptionalEmails(input: {
  orderNumber: number;
  customerEmail: string;
  customerName: string;
  pickupTime: string;
  items: StoredLineItem[];
}) {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ?? "onboarding@resend.dev";
  const kitchenEmail = process.env.KITCHEN_EMAIL?.trim();
  const confirmFlag = process.env.SEND_CUSTOMER_ORDER_EMAIL?.trim().toLowerCase();
  const sendCustomer =
    confirmFlag === "1" ||
    confirmFlag === "true" ||
    confirmFlag === "yes";

  const rows = input.items
    .map((li) => {
      const label = escapeHtml(li.name);
      const det = li.detail ? ` — ${escapeHtml(li.detail)}` : "";
      return `<tr><td style="padding:6px 0;border-bottom:1px solid #eee">${label}${det}</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">${li.quantity}×</td></tr>`;
    })
    .join("");

  const htmlCustomer = `
    <p>Hi ${escapeHtml(input.customerName || "there")},</p>
    <p>Thanks for your order. Your pickup number is <strong>#${input.orderNumber}</strong>.</p>
    <p><strong>Pickup time:</strong> ${escapeHtml(input.pickupTime || "Not specified")}</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-family:sans-serif;font-size:14px">
      <thead><tr><th align="left">Item</th><th align="right">Qty</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:16px">See you at the window!</p>
  `;

  const htmlKitchen = `
    <h1>New paid order</h1>
    <p><strong>Order #:</strong> ${input.orderNumber}</p>
    <p><strong>Customer:</strong> ${escapeHtml(input.customerName || "Guest")}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.customerEmail)}</p>
    <p><strong>Pickup time:</strong> ${escapeHtml(input.pickupTime || "Not specified")}</p>
    <table style="width:100%;border-collapse:collapse;margin-top:16px;font-family:sans-serif;font-size:14px">
      <thead><tr><th align="left">Item</th><th align="right">Qty</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  if (!resendKey) {
    if (sendCustomer || kitchenEmail) {
      console.warn("RESEND_API_KEY not set; skipping order emails.");
    }
    return;
  }

  const resend = new Resend(resendKey);

  if (sendCustomer && input.customerEmail) {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: input.customerEmail,
      subject: `Your order #${input.orderNumber} — Stop 'N Go`,
      html: htmlCustomer,
    });
    if (error) console.error("Resend customer confirmation error", error);
  }

  if (kitchenEmail) {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: kitchenEmail,
      subject: `Stop 'N Go — order #${input.orderNumber} (${input.pickupTime || "pickup"})`,
      html: htmlKitchen,
    });
    if (error) console.error("Resend kitchen email error", error);
  }
}

export type CompleteOrderResult =
  | { ok: true; orderNumber: number; alreadyExisted: boolean }
  | { ok: false; error: string; status: number; code?: string };

export async function completeStoreOrderFromSquare(params: {
  squareOrderId: string;
  squarePaymentId?: string;
}): Promise<CompleteOrderResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Supabase is not configured.", status: 500 };
  }

  const client = getSquareClient();
  if (!client) {
    return { ok: false, error: "Square is not configured.", status: 500 };
  }

  let orderResp;
  try {
    orderResp = await client.orders.get({ orderId: params.squareOrderId });
  } catch {
    return { ok: false, error: "Could not load Square order.", status: 502 };
  }

  const order = orderResp.order as Record<string, unknown> | undefined;
  if (!order) {
    return { ok: false, error: "Square order not found.", status: 404 };
  }

  if (!isSquareOrderPaid(order)) {
    return {
      ok: false,
      error: "Payment is still processing. Try again in a moment.",
      status: 409,
      code: "PAYMENT_PENDING",
    };
  }

  const meta = order.metadata as
    | Record<string, string | null | undefined>
    | undefined;
  const customerName = metadataString(meta, "customerName");
  const customerEmail = metadataString(meta, "customerEmail");
  const pickupTime = metadataString(meta, "pickupTime");
  const items = lineItemsFromSquareOrder(order);

  const tz = getOrderDayTz();

  const { data: rows, error: rpcError } = await supabase.rpc(
    "create_store_order",
    {
      p_square_order_id: params.squareOrderId,
      p_square_payment_id: params.squarePaymentId ?? "",
      p_customer_name: customerName,
      p_customer_email: customerEmail,
      p_pickup_time: pickupTime,
      p_items: items,
      p_tz: tz,
    }
  );

  if (rpcError) {
    console.error("create_store_order rpc", rpcError);
    return { ok: false, error: "Could not save order.", status: 500 };
  }

  const row = Array.isArray(rows) ? rows[0] : rows;
  const rawNum = row?.order_number as number | string | undefined;
  const orderNumber =
    typeof rawNum === "number" && Number.isFinite(rawNum)
      ? Math.trunc(rawNum)
      : typeof rawNum === "string" && rawNum.trim() !== ""
        ? Math.trunc(Number(rawNum))
        : NaN;
  const inserted = Boolean(row?.inserted);

  if (!Number.isInteger(orderNumber) || orderNumber < 1) {
    return { ok: false, error: "Could not save order.", status: 500 };
  }

  if (inserted) {
    await sendOptionalEmails({
      orderNumber,
      customerEmail,
      customerName,
      pickupTime,
      items,
    }).catch((e) => console.error("sendOptionalEmails", e));
  }

  return { ok: true, orderNumber, alreadyExisted: !inserted };
}
