import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import User from "@/models/user";

export async function GET() {
  await connectDB();
  const _ = User; // Ensure User model is registered (prevents Webpack tree-shaking)
  try {
    const courses = await Course.find({ isPublished: true })
      .select("-chapters -reviews")
      .populate("instructor", "name email")
      .lean();

    const updatedCourses = courses.map((course: any) => {
      const discount = (course.discountPercent / 100) * course.originalPrice;
      const finalPrice = Math.max(0, course.originalPrice - discount);
      return {
        ...course,
        finalPrice,
      };
    });

    return NextResponse.json({ success: true, courses: updatedCourses });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch courses" }, { status: 500 });
  }
}
