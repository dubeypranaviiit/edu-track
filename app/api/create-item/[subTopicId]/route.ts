import { connectDB } from "@/lib/mongoose";
import Subtopic from "@/models/Course/subTopic";
import Item from "@/models/Course/item";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";

export async function POST(req: NextRequest, context: any

) {
  const { subTopicId } = context.params;

  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const type = formData.get("type") as "video" | "reading" | "assignment";
    const content = formData.get("content") as string;
    const uploadType = formData.get("uploadType") as "upload" | "url" | undefined;
    const videoUrlInput = formData.get("videoUrl") as string | undefined;
    const file = formData.get("file") as File | null;

  
    const subtopic = await Subtopic.findById(subTopicId);
    if (!subtopic) return NextResponse.json({ message: "Subtopic not found" }, { status: 404 });

    let finalVideoUrl: string | undefined;
    let resources: string[] = [];

    if (type === "video") {
      if (uploadType === "url" && videoUrlInput) {
        finalVideoUrl = videoUrlInput;
      } else if (uploadType === "upload" && file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        const uploadedUrl = await uploadToCloudinary(base64, "course-videos");
        if (uploadedUrl) finalVideoUrl = uploadedUrl;
      } else {
        return NextResponse.json({ message: "Video URL or file required." }, { status: 400 });
      }
    }

    if (type === "assignment") {
      if (!file) return NextResponse.json({ message: "Assignment file required." }, { status: 400 });
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      const uploadedUrl = await uploadToCloudinary(base64, "assignments");
      if (uploadedUrl) resources.push(uploadedUrl);
    }


    const newItem = new Item({
      title,
      type,
      content,
      uploadType: type === "video" ? uploadType : "upload",
      videoUrl: finalVideoUrl,
      resources,
    });

    await newItem.save();

   
    subtopic.items.push(newItem._id);
    await subtopic.save();

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error("Failed to create item:", err);
    return NextResponse.json({ message: "Failed to add item" }, { status: 500 });
  }
}
