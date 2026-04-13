import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendKey = process.env.RESEND_API_KEY;
const kitchenEmail = process.env.KITCHEN_EMAIL;
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 500 }
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const expanded = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items"],
    });

    const customerName =
      expanded.metadata?.customerName ?? "Guest";
    const pickupTime = expanded.metadata?.pickupTime ?? "Not specified";
    const customerEmail =
      expanded.metadata?.customerEmail ??
      expanded.customer_details?.email ??
      "";

    const lines = expanded.line_items?.data ?? [];
    const rows = lines
      .map((li) => {
        const label = escapeHtml(li.description ?? "Item");
        const qty = li.quantity ?? 0;
        const lineTotal = ((li.amount_total ?? 0) / 100).toFixed(2);
        return `<tr><td style="padding:6px 0;border-bottom:1px solid #eee">${label}</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">${qty}×</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">$${lineTotal}</td></tr>`;
      })
      .join("");

    const total = ((expanded.amount_total ?? 0) / 100).toFixed(2);

    const html = `
      <h1>New paid order</h1>
      <p><strong>Customer:</strong> ${escapeHtml(customerName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(customerEmail)}</p>
      <p><strong>Pickup time:</strong> ${escapeHtml(pickupTime)}</p>
      <p><strong>Stripe session:</strong> ${escapeHtml(expanded.id)}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-family:sans-serif;font-size:14px">
        <thead><tr><th align="left">Item</th><th align="right">Qty</th><th align="right">Line</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:16px"><strong>Total paid: $${total}</strong></p>
    `;

    if (resendKey && kitchenEmail) {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: kitchenEmail,
        subject: `Stop 'N Go, order paid (${pickupTime})`,
        html,
      });
      if (error) {
        console.error("Resend error", error);
      }
    } else {
      console.warn("Resend or KITCHEN_EMAIL not set; skipping kitchen email.");
    }
  }

  return NextResponse.json({ received: true });
}
