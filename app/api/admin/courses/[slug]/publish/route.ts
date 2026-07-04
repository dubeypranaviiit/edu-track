import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import AdminAction from "@/models/adminAction";
import { requireRole } from "@/lib/auth/requireRole";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { slug } = await params;
    const { isPublished } = await req.json();

    if (typeof isPublished !== "boolean") {
      return NextResponse.json({ error: "Invalid publish status specified" }, { status: 400 });
    }

    const course = await Course.findOne({ slug });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const oldPublished = course.isPublished;
    course.isPublished = isPublished;
    await course.save();

    // Log admin action
    await AdminAction.create({
      admin: authResult.user._id,
      action: isPublished ? "publish_course" : "unpublish_course",
      targetType: "Course",
      targetId: course._id,
      meta: { from: oldPublished, to: isPublished },
    });

    return NextResponse.json({ success: true, course }, { status: 200 });
  } catch (error) {
    console.error("Error toggling course publish state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
