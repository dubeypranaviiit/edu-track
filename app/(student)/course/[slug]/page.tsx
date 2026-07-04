import CourseDetail from "@/components/course/CourseDetail";
import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import Item from "@/models/Course/item";
import User from "@/models/user";
import Enrollment from "@/models/enrollment.model";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const { userId } = await auth();

  try {
    await connectDB();
    const courseDoc = (await Course.findOne({ slug })
      .populate({
        path: "chapters",
        model: Chapter,
        populate: {
          path: "subtopics",
          model: Subtopic,
          populate: {
            path: "items",
            model: Item,
          },
        },
      })
      .lean()) as any;

    if (!courseDoc) {
      notFound();
    }

    let isEnrolled = false;
    if (userId) {
      const dbUser = await User.findOne({ clerkId: userId });
      if (dbUser) {
        const enrollment = await Enrollment.findOne({
          user: dbUser._id,
          course: courseDoc._id,
        });
        isEnrolled = !!enrollment;
      }
    }

    const discount = (courseDoc.discountPercent / 100) * courseDoc.originalPrice;
    const finalPrice = Math.max(0, courseDoc.originalPrice - discount);

    const course = JSON.parse(
      JSON.stringify({
        ...courseDoc,
        finalPrice,
        isEnrolled,
      })
    );

    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
        <main className="flex-1">
          <CourseDetail course={course} />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Failed to load course details:", error);
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-gray-900">
        <h1 className="text-3xl font-bold">Failed to load course</h1>
      </div>
    );
  }
}
