import { connectDB } from "@/lib/mongoose";
import Item from "@/models/Course/item";
import Subtopic from "@/models/Course/subTopic";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import { requireRole } from "@/lib/auth/requireRole";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await connectDB();

    const authResult = await requireRole(["instructor", "admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const { user } = authResult;

    const { itemId } = await params;

    // Verify course ownership
    const subtopic = await Subtopic.findOne({ items: itemId }).populate({
      path: "chapter",
      populate: { path: "course" }
    });
    if (!subtopic) return NextResponse.json({ message: "Parent subtopic not found" }, { status: 404 });

    const course = (subtopic.chapter as any)?.course;
    if (course && course.instructor.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const type = formData.get("type") as "video" | "reading" | "assignment";
    const content = formData.get("content") as string;
    const uploadType = formData.get("uploadType") as "upload" | "url" | undefined;
    const videoUrlInput = formData.get("videoUrl") as string | undefined;
    const file = formData.get("file") as File | null;

    const updateData: any = { title, type, content, uploadType };

    if (type === "video") {
      if (uploadType === "url" && videoUrlInput) updateData.videoUrl = videoUrlInput;
      else if (uploadType === "upload" && file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        const uploadedUrl = await uploadToCloudinary(base64, "course-videos");
        updateData.videoUrl = uploadedUrl;
      }
    }

    if (type === "assignment" && file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      const uploadedUrl = await uploadToCloudinary(base64, "assignments");
      updateData.resources = uploadedUrl ? [uploadedUrl] : [];
    }

    const item = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    return NextResponse.json(item);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update item" }, { status: 500 });
  }
}

export const PUT = PATCH;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await connectDB();

    const authResult = await requireRole(["instructor", "admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const { user } = authResult;

    const { itemId } = await params;

    // Verify course ownership
    const subtopic = await Subtopic.findOne({ items: itemId }).populate({
      path: "chapter",
      populate: { path: "course" }
    });
    if (!subtopic) return NextResponse.json({ message: "Parent subtopic not found" }, { status: 404 });

    const course = (subtopic.chapter as any)?.course;
    if (course && course.instructor.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const item = await Item.findByIdAndDelete(itemId);
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    // Also pull from subtopic items array
    subtopic.items = subtopic.items.filter((id: any) => id.toString() !== itemId);
    await subtopic.save();

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete item" }, { status: 500 });
  }
}
