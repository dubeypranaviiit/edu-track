import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Enrollment from "@/models/enrollment.model";
import { requireRole } from "@/lib/auth/requireRole";
import "@/models/user";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email clerkId")
      .sort({ createdAt: -1 });

    const coursesWithCounts = await Promise.all(
      courses.map(async (course) => {
        const count = await Enrollment.countDocuments({ course: course._id });
        return {
          ...course.toObject(),
          enrollmentCount: count,
        };
      })
    );

    return NextResponse.json(coursesWithCounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
