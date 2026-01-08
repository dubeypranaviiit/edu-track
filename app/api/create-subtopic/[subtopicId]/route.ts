import { connectDB } from "@/lib/mongoose";
import Subtopic from "@/models/Course/subTopic";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: any

) {
  const { subtopicId } = context.params;
  const { title } = await req.json();

  try {
    await connectDB();
    const subtopic = await Subtopic.findByIdAndUpdate(subtopicId, { title }, { new: true });
    if (!subtopic) return NextResponse.json({ message: "Subtopic not found" }, { status: 404 });

    return NextResponse.json(subtopic);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update subtopic" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest,context: any
  //  { params }: { params: { subtopicId: string } }
  ) {
  const { subtopicId } = context.params;

  try {
    await connectDB();
    const subtopic = await Subtopic.findByIdAndDelete(subtopicId);
    if (!subtopic) return NextResponse.json({ message: "Subtopic not found" }, { status: 404 });

    return NextResponse.json({ message: "Subtopic deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete subtopic" }, { status: 500 });
  }
}
