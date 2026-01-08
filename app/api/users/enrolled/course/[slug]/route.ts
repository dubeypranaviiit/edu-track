
import { NextResponse,NextRequest } from "next/server";
import Subtopic from "@/models/Course/subTopic";
import Item from "@/models/Course/item";
import Course from "@/models/Course/course";
import User from "@/models/User";
import Enrollment from "@/models/enrollment.model";
import { connectDB } from "@/lib/mongoose";
export async function GET(req: NextRequest, context: any
 
) {
  await connectDB();

  const { slug } = context.params; 
  const clerkId = req.nextUrl.searchParams.get("clerkId");

  if (!clerkId) {
    return NextResponse.json({ message: "Missing clerkId" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const course = await Course.findOne({ slug })
      .populate({
        path: "chapters",
        populate: {
          path: "subtopics",
          populate: {
            path: "items",
          },
        },
      });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }
    const enrollment = await Enrollment.findOne({ user: user._id, course: course._id });
    if (!enrollment) {
      return NextResponse.json({ message: "User not enrolled in this course" }, { status: 403 });
    }

    return NextResponse.json({ course });
  } catch (err) {
    console.log(`moncghcdhshbfjdnslddfnkjcgxfkln dmcklnfdmc;lbh`,err);
    return NextResponse.json({ message: "Failed to fetch course" }, { status: 500 });
  }
}
