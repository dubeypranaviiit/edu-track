import { connectDB } from "@/lib/mongoose";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { chapterId, title } = await req.json();

    if (!chapterId || !title) {
      return NextResponse.json(
        { message: "chapterId and title are required" },
        { status: 400 }
      );
    }
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return NextResponse.json({ message: "Chapter not found" }, { status: 404 });
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
