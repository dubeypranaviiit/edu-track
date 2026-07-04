import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import AdminAction from "@/models/adminAction";
import { requireRole } from "@/lib/auth/requireRole";
import { Types } from "mongoose";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = await params;
    const { status } = await req.json(); // "approved" | "rejected"

    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status specified" }, { status: 400 });
    }

    const query = Types.ObjectId.isValid(id) ? { _id: id } : { clerkId: id };
    const targetUser = await User.findOne(query);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const oldStatus = targetUser.instructorStatus;
    targetUser.instructorStatus = status;

    if (status === "approved") {
      targetUser.role = "instructor";
    }

    await targetUser.save();

    // Log admin action
    await AdminAction.create({
      admin: authResult.user._id,
      action: status === "approved" ? "approve_instructor" : "reject_instructor",
      targetType: "User",
      targetId: targetUser._id,
      meta: { from: oldStatus, to: status },
    });

    return NextResponse.json({ success: true, user: targetUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating instructor status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
