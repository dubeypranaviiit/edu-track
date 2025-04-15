import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import Item from '@/models/Course/item'; 
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
export async function POST(req: NextRequest, context: { params: {subTopicId: string } }) {
  const {subTopicId} = await context.params;
 console.log(`SuB topic id`,subTopicId);
  try {
    
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const type = formData.get("type") as "video" | "reading" | "assignment";
    const content = formData.get("content") as string;
    const videoUrlInput = formData.get("videoUrl") as string;
    const file = formData.get("file") as File | null;

    await connectDB();

    const subtopic = await Subtopic.findById(subTopicId);
    if (!subtopic) {
      console.log(`Sub topic nahimila yaha`);
      return NextResponse.json({ message: "Subtopic not found" }, { status: 404 });
    }

    let finalVideoUrl: string | undefined;
    let assignmentUrl: string | undefined;

    if (type === "video") {
      if (videoUrlInput) {
        finalVideoUrl = videoUrlInput;
      } else if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        const uploadedUrl = await uploadToCloudinary(base64, "course-videos");
        if (uploadedUrl) finalVideoUrl = uploadedUrl;
      } else {
        return NextResponse.json({ message: "Either video URL or file is required." }, { status: 400 });
      }
    }

    if (type === "assignment") {
      if (!file || file.size === 0) {
        return NextResponse.json({ message: "Assignment file is required." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      const uploadedUrl = await uploadToCloudinary(base64, "assignments");
      if (uploadedUrl) assignmentUrl = uploadedUrl;
    }

    const newItem = new Item({
      title,
      type,
      content,
      videoUrl: type === "video" ? finalVideoUrl : undefined,
      resources: type === "assignment" && assignmentUrl ? [assignmentUrl] : [],
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


