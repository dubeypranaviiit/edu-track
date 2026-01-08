import { NextRequest, NextResponse } from "next/server";
import Enrollment from "@/models/enrollment.model";
import User from "@/models/User"; 
import Course from "@/models/Course/course" 
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ success: false, message: "Missing session ID" }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const { courseId, userId } = session.metadata as any;
    const amount = session.amount_total! / 100; 
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }
    const enrollment = await Enrollment.create({
      user: user._id, 
      course: course._id,
      payment: {
        amount,
        currency: session.currency,
        paymentId: session.payment_intent as string,
        status: "paid",
      },
    });

    return NextResponse.json({ success: true, enrollment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Enrollment creation failed", error: err },
      { status: 500 }
    );
  }
}
