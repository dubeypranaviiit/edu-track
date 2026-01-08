import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { title, courseId } = await req.json();

    if (!title || !courseId) {
      return NextResponse.json({ message: "Title and courseId required" }, { status: 400 });
    }

    const course = await Course.findOne({ slug: courseId });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
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
