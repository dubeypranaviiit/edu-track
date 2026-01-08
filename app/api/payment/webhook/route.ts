import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import Enrollment from "@/models/enrollment.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await Enrollment.create({
        user: session.metadata?.userId,
        course: session.metadata?.courseId,
        payment: {
          amount: (session.amount_total || 0) / 100,
          currency: session.currency,
          paymentId: session.payment_intent as string,
          status: "paid",
        },
        enrolledAt: new Date(),
      });
    } catch (err) {
      console.error("Enrollment creation failed", err);
      return NextResponse.json({ message: "Enrollment creation failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
