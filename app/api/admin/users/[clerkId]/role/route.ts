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
    const { role } = await req.json();

    if (!role || !["student", "instructor", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    const targetUser = await User.findOne({ clerkId });
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const oldRole = targetUser.role;
    targetUser.role = role;
    
    // Auto-approve instructor status if role is set to instructor
    if (role === "instructor" && targetUser.instructorStatus !== "approved") {
      targetUser.instructorStatus = "approved";
    }
    
    await targetUser.save();

    // Log admin action
    await AdminAction.create({
      admin: authResult.user._id,
      action: "role_change",
      targetType: "User",
      targetId: targetUser._id,
      meta: { from: oldRole, to: role },
    });

    return NextResponse.json({ success: true, user: targetUser }, { status: 200 });
  } catch (error) {
    console.error("Error changing user role:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
