import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import { requireRole } from "@/lib/auth/requireRole";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const pendingRequests = await User.find({ instructorStatus: "pending" })
      .sort({ updatedAt: -1 });

    return NextResponse.json(pendingRequests, { status: 200 });
  } catch (error) {
    console.error("Error fetching instructor requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
