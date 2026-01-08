import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Contact from "@/models/contact";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, phone, method, message } = await req.json();

    if (!name || !email || !method) {
      return NextResponse.json(
        { message: "Name, email, and contact method are required" },
        { status: 400 }
      );
    }

    const newMessage = new Contact({ name, email, phone, method, message });
    await newMessage.save();

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
