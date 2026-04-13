import { NextResponse } from "next/server";
import { WebhooksHelper } from "square";
import { completeStoreOrderFromSquare } from "@/lib/complete-store-order";

export const runtime = "nodejs";

function extractPaymentFromWebhookData(data: unknown): {
  orderId?: string;
  paymentId?: string;
  status?: string;
} {
  if (!data || typeof data !== "object") return {};
  const d = data as Record<string, unknown>;
  const obj = d.object as Record<string, unknown> | undefined;
  const pay = (obj?.payment ?? obj) as Record<string, unknown> | undefined;
  if (!pay || typeof pay !== "object") return {};
  return {
    orderId: typeof pay.orderId === "string" ? pay.orderId : undefined,
    paymentId: typeof pay.id === "string" ? pay.id : undefined,
    status: typeof pay.status === "string" ? pay.status : undefined,
  };
}

export async function POST(request: Request) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim();
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL?.trim();

  const body = await request.text();
  const sig = request.headers.get("x-square-hmacsha256-signature");

  if (!signatureKey || !notificationUrl) {
    return NextResponse.json(
      { error: "Square webhook is not configured." },
      { status: 500 }
    );
  }

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const ok = await WebhooksHelper.verifySignature({
    requestBody: body,
    signatureHeader: sig,
    signatureKey,
    notificationUrl,
  });

  if (!ok) {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = typeof event.type === "string" ? event.type : "";
  if (type === "payment.updated" || type === "payment.created") {
    const pay = extractPaymentFromWebhookData(event.data);
    if (pay.orderId && pay.status === "COMPLETED") {
      await completeStoreOrderFromSquare({
        squareOrderId: pay.orderId,
        squarePaymentId: pay.paymentId,
      }).catch((e) => console.error("square webhook order", e));
    }
  }

  return NextResponse.json({ received: true });
}
