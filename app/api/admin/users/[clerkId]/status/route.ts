import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import AdminAction from "@/models/adminAction";
import { requireRole } from "@/lib/auth/requireRole";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ clerkId: string }> }
) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { clerkId } = await params;
    const { isActive } = await req.json();

    if (typeof isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid status specified" }, { status: 400 });
    }

    const targetUser = await User.findOne({ clerkId });
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const oldStatus = targetUser.isActive;
    targetUser.isActive = isActive;
    await targetUser.save();

    // Log admin action
    await AdminAction.create({
      admin: authResult.user._id,
      action: isActive ? "reactivate_user" : "suspend_user",
      targetType: "User",
      targetId: targetUser._id,
      meta: { from: oldStatus, to: isActive },
    });

    return NextResponse.json({ success: true, user: targetUser }, { status: 200 });
  } catch (error) {
    console.error("Error toggling user status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
