import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";


export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const instructorId = url.searchParams.get("instructorId");

    let query = {};
    if (instructorId) query = { instructor: instructorId };

    const courses = await Course.find(query).lean();

    const updatedCourses = courses.map(course => ({
      ...course,
      finalPrice: course.originalPrice - (course.originalPrice * (course.discountPercent || 0)) / 100,
    }));

    return NextResponse.json({ success: true, courses: updatedCourses });
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}