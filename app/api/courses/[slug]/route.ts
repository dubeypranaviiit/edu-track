import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";

export async function GET(req: NextRequest, context: any) { 
  await connectDB();
  try {
    const { slug } = context.params;

    const course = await Course.findOne({ slug }).populate({
      path: "chapters",
      populate: {
        path: "subtopics",
        populate: { path: "items" },
      },
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch course" }, { status: 500 });
  }
}
