import { connectDB } from "@/lib/mongoose";
import Course from "@/models/course";
import Chapter from "@/models/chapter";
import Subtopic from "@/models/subTopic";
import { NextRequest, NextResponse } from "next/server";

// Utility function to calculate the final price
const calculateFinalPrice = (originalPrice: number, discountPercent: number): number => {
  if (discountPercent > 0) {
    return originalPrice - (originalPrice * discountPercent) / 100;
  }
  return originalPrice;
};

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  await connectDB();

  try {
    const slug = decodeURIComponent(params.slug.trim());

    const course = await Course.findOne({ slug })
      .populate({
        path: "chapters",
        populate: {
          path: "subtopics",
          model: "Subtopic",
        },
      })
      .populate("instructor")
      .lean();

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    const courseWithFinalPrice = {
      ...course,
      finalPrice: calculateFinalPrice(course.originalPrice, course.discountPercent),
    };

    return NextResponse.json({
      success: true,
      course: courseWithFinalPrice,
    });
  } catch (error: any) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
