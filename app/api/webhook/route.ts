import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { registerTicketPurchase } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  console.log("POST /api/checkout-sessions");
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");
  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Event: ", event.type);

    if (event.type === "checkout.session.completed") {
      console.log(`🔔  Payment received on ${dateTime} at ${timeString}!`);
      const response = await registerTicketPurchase(
        res?.data.object.receipt_email
      );

      if (response instanceof Error) {
        throw new Error("Error registering ticket purchase");
      }
    }

    return NextResponse.json({ status: "success", event: event.type });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message });
  }
}

// Handle other methods if necessary
export async function GET(req: any, res: any) {
  console.log("GET /api/checkout-sessions");
  res.setHeader("Allow", ["POST"]);
  res.status(405).end("Method Not Allowed");
}
