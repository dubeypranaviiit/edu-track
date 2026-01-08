import { connectDB } from "@/lib/mongoose";
import Chapter from "@/models/Course/chapter";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: any


) {
  const { chapterId } = context.params;
  const { title } = await req.json();

  try {
    await connectDB();
    const chapter = await Chapter.findByIdAndUpdate(chapterId, { title }, { new: true });
    if (!chapter) return NextResponse.json({ message: "Chapter not found" }, { status: 404 });

    return NextResponse.json(chapter);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update chapter" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest,context: any

  ) {
  const { chapterId } = context.params;

  try {
    await connectDB();
    const chapter = await Chapter.findByIdAndDelete(chapterId);
    if (!chapter) return NextResponse.json({ message: "Chapter not found" }, { status: 404 });

    return NextResponse.json({ message: "Chapter deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete chapter" }, { status: 500 });
  }
}
