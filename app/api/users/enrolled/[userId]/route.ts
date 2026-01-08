
import { NextRequest, NextResponse } from "next/server";
import Enrollment from "@/models/enrollment.model";
import Course from "@/models/Course/course";
import { connectDB } from "@/lib/mongoose";

connectDB();

export async function GET(
  req: NextRequest,context: any
) {
  try {
    const { userId } = context.params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

   
    const enrollments = await Enrollment.find({ user: userId })
      .populate({
        path: "course",
        model: Course,
        populate: {
          path: "instructor",
          select: "name email",
        },
      })
      .sort({ enrolledAt: -1 });

   
    const courses = enrollments.map((enrollment) => enrollment.course);

    return NextResponse.json({
      success: true,
      enrollments,
      courses,
    });
  } catch (error: any) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch enrolled courses",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

