import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import { connectDB } from "@/lib/mongoose";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import Assignment from "@/models/Course/assignment";
import Course from "@/models/Course/course";
async function saveTempFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuidv4()}-${file.name}`;
  const tempPath = path.join(tmpdir(), filename);
  await writeFile(tempPath, buffer);
  return tempPath;
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    const slugInput = formData.get("slug") as string;
    const topic = formData.get("topic") as string;
    const subtopic = (formData.get("subtopic") as string) || "";
    const type = formData.get("type") as "file" | "text";
    const uploadedBy = formData.get("instructor") as string;
    const textContent = (formData.get("textContent") as string) || "";
    console.log(formData);
    if (!slugInput || !topic || !type || !uploadedBy) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
      }
     const courseDoc = await Course.findOne({ slug: slugInput, instructor: uploadedBy });
     if (!courseDoc) {
      return NextResponse.json({ success: false, error: "Course not found for this instructor." }, { status: 404 });
      }

    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    if (type === "file") {
      const uploadedFile = formData.get("file") as File | null;
      if (!uploadedFile) {
        return NextResponse.json({ success: false, error: "File is required for file-based assignment." }, { status: 400 });
      }

      const tempPath = await saveTempFile(uploadedFile);
      fileUrl = await uploadToCloudinary(tempPath, "assignments/files");
      await unlink(tempPath);

      fileName = uploadedFile.name;
      fileType = uploadedFile.type;
    } else if (type === "text") {
      if (!textContent.trim()) {
        return NextResponse.json({ success: false, error: "Text content is required for text-based assignment." }, { status: 400 });
      }
    }

    const assignmentSlug = slugify(topic, { lower: true, strict: true });

    const newAssignment = new Assignment({
      course: courseDoc._id,
      slug: assignmentSlug,
      topic,
      subtopic,
      type,
      fileUrl,
      fileName,
      fileType,
      textContent,
    uploadedBy
    });

    await newAssignment.save();

    return NextResponse.json({
      success: true,
      message: "Assignment created successfully.",
      assignment: newAssignment,
    });
  } catch (error: any) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error while creating assignment." },
      { status: 500 }
    );
  }
}
