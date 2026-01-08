import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";

interface Params {
  slug: string;
}

export async function GET(req: NextRequest, context: any) {
  await connectDB();

  try {
    const { slug } = context.params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const course = await Course.findOne({ slug }).lean();

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ course });
  } catch (err) {
    console.error("Error fetching course:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
