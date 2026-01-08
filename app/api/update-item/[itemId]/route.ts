import { connectDB } from "@/lib/mongoose";
import Item from "@/models/Course/item";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";

export async function PATCH(req: NextRequest, context: any
  // { params }: { params: { itemId: string } }
) {
  const { itemId } = context.params;

  try {
    await connectDB();
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

export async function DELETE(req: NextRequest, context: any
) {
  const { itemId } = context.params;

  try {
    await connectDB();
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete item" }, { status: 500 });
  }
}
