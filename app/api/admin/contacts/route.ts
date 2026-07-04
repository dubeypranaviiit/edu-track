import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Contact from "@/models/contact";
import { requireRole } from "@/lib/auth/requireRole";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
