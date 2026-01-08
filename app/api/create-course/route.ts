import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
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
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const originalPrice = Number(formData.get("originalPrice"));
    const discountPercent = Number(formData.get("discountPercent")) || 0;
    const instructor = formData.get("instructor") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const certificate = formData.get("certificate") === "true";
    const featuresString = formData.get("features") as string;
    const features =
      featuresString && featuresString.trim() !== ""
        ? featuresString.split(",").map(f => f.trim())
        : [];

    const thumbnailFile = formData.get("thumbnail") as File | null;
    const logoFile = formData.get("logo") as File | null;
    let thumbnailUrl = "";
    let logoUrl = "";

    if (thumbnailFile) {
      const tempThumbnail = await saveTempFile(thumbnailFile);
      thumbnailUrl = await uploadToCloudinary(tempThumbnail, "courses/thumbnails");
      await unlink(tempThumbnail);
    }

    if (logoFile) {
      const tempLogo = await saveTempFile(logoFile);
      logoUrl = await uploadToCloudinary(tempLogo, "courses/logos");
      await unlink(tempLogo);
    }
    const newCourse = new Course({
      title,
      slug,
      description,
      thumbnail: thumbnailUrl,
      logo: logoUrl,
      originalPrice,
      discountPercent,
      instructor,
      category,
      level,
      duration,
      certificate,
      features,
    });

    await newCourse.save();

    return NextResponse.json({
      success: true,
      course: {
        ...newCourse.toObject(),
        finalPrice: newCourse.finalPrice,
      },
    });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error creating course" },
      { status: 500 }
    );
  }
}

const calculateFinalPrice = (originalPrice: number, discountPercent: number) => {
  return originalPrice - (originalPrice * discountPercent) / 100
}

export async function GET(req: NextRequest) {
  await connectDB()

  try {
  
    const courses = await Course.find().lean()

    const updatedCourses = courses.map((course: any) => ({
      ...course,
      finalPrice: calculateFinalPrice(course.originalPrice, course.discountPercent),
    }))

 
    return NextResponse.json({
      success: true,
      courses: updatedCourses,
    })
  } catch (error: any) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: error.message || 'Error fetching courses from database' },
      { status: 500 }
    )
  }
}