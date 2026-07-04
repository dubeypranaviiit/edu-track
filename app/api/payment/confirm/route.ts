import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Enrollment from "@/models/enrollment.model";
import User from "@/models/user";
import Stripe from "stripe";

import Course from "@/models/Course/course";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    await connectDB();
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ success: false, message: "Missing session ID" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const { courseId, userId } = session.metadata as any;

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    let enrollment = await Enrollment.findOne({
      user: user._id,
      course: courseId,
    });

    if (!enrollment && session.payment_status === "paid") {
      enrollment = await Enrollment.create({
        user: user._id,
        course: courseId,
        payment: {
          amount: (session.amount_total || 0) / 100,
          currency: session.currency,
          paymentId: session.payment_intent as string,
          status: "paid",
        },
        enrolledAt: new Date(),
      });

      await Course.findByIdAndUpdate(
        courseId,
        { $inc: { totalEnrollments: 1 } }
      );
    }

    return NextResponse.json({ success: true, enrolled: !!enrollment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Could not verify enrollment" }, { status: 500 });
  }
}
