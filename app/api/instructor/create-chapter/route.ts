import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/requireRole";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authResult = await requireRole(["instructor", "admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }
    const { user } = authResult;

    const { title, courseId } = await req.json();

    if (!title || !courseId) {
      return NextResponse.json({ message: "Title and courseId required" }, { status: 400 });
    }

    const course = await Course.findOne({ slug: courseId });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    
    if (course.instructor.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const newChapter = new Chapter({ title, course: course._id });
    await newChapter.save();

    course.chapters.push(newChapter._id);
    await course.save();

    return NextResponse.json({ success: true, chapter: newChapter }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to add chapter" }, { status: 500 });
  }
}
