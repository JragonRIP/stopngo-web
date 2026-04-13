import { NextResponse } from "next/server";
import {
  completeStoreOrderFromSquare,
  resolveSquareOrderId,
} from "@/lib/complete-store-order";
import { getSquareClient } from "@/lib/square-client";

export const runtime = "nodejs";

type Body = {
  orderId?: string;
  checkoutId?: string;
  transactionId?: string;
  /** Square sometimes returns payment-link id under another name */
  paymentLinkId?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const client = getSquareClient();
  if (!client) {
    return NextResponse.json(
      { error: "Square is not configured." },
      { status: 500 }
    );
  }

  const resolved = await resolveSquareOrderId(client, {
    orderId: body.orderId,
    checkoutId: body.checkoutId ?? body.paymentLinkId,
    transactionId: body.transactionId,
  });

  if (!resolved) {
    return NextResponse.json(
      { error: "Missing Square order reference." },
      { status: 400 }
    );
  }

  const result = await completeStoreOrderFromSquare(resolved);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, code: result.code },
      { status: result.status }
    );
  }

  return NextResponse.json({
    orderNumber: result.orderNumber,
    alreadyExisted: result.alreadyExisted,
  } satisfies { orderNumber: number; alreadyExisted: boolean });
}
