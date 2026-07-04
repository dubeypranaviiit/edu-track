import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
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

    const { chapterId, title } = await req.json();

    if (!chapterId || !title) {
      return NextResponse.json(
        { message: "chapterId and title are required" },
        { status: 400 }
      );
    }
    const chapter = await Chapter.findById(chapterId).populate("course");
    if (!chapter) {
      return NextResponse.json({ message: "Chapter not found" }, { status: 404 });
    }

    const course = chapter.course as any;
    if (course.instructor.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const newSubtopic = new Subtopic({
      title,
      chapter: chapter._id,
    });
    await newSubtopic.save();
    chapter.subtopics.push(newSubtopic._id);
    await chapter.save();

    return NextResponse.json({ success: true, subtopic: newSubtopic }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to add subtopic" }, { status: 500 });
  }
}
