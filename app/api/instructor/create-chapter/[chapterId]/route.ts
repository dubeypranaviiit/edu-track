import { connectDB } from "@/lib/mongoose";
import Chapter from "@/models/Course/chapter";
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/requireRole";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const authResult = await requireRole(["instructor", "admin"]);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  const { chapterId } = await params;
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const authResult = await requireRole(["instructor", "admin"]);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  const { chapterId } = await params;

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
