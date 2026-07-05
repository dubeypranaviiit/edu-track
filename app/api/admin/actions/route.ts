import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import AdminAction from "@/models/adminAction";
import { requireRole } from "@/lib/auth/requireRole";


import "@/models/user";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const actions = await AdminAction.find()
      .populate("admin", "name email clerkId")
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json(actions, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin actions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
