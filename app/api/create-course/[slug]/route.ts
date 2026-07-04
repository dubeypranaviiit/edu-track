import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import Item from "@/models/Course/item";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const calculateFinalPrice = (originalPrice: number, discountPercent: number): number => {
  if (discountPercent > 0) {
    return originalPrice - (originalPrice * discountPercent) / 100;
  }
  return originalPrice;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
  
    const course = await Course.findOne({ slug })
      .populate({
        path: 'chapters',
        model: Chapter,
        populate: {
          path: 'subtopics',
          model: Subtopic,
          populate: {
            path: 'items',
            model: Item,
          },
        },
      });

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    const courseWithFinalPrice = {
      ...course.toObject(),
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { slug } = await params;

    const course = await Course.findOne({ slug }).populate({
      path: "chapters",
      populate: { path: "subtopics", populate: { path: "items" } },
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Delete all nested items, subtopics, chapters, then the course
    for (const chapter of (course.chapters as any[] || [])) {
      for (const subtopic of (chapter.subtopics as any[] || [])) {
        await Item.deleteMany({ _id: { $in: subtopic.items } });
        await Subtopic.findByIdAndDelete(subtopic._id);
      }
      await Chapter.findByIdAndDelete(chapter._id);
    }

    await Course.findByIdAndDelete(course._id);

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error('[DELETE COURSE ERROR]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const {
    title,
    description,
    thumbnail,
    logo,
    originalPrice,
    discountPercent,
    category,
    level,
    duration,
    features,
    certificate
  } = await req.json();

  try {
    await connectDB();
  
    const course = await Course.findOne({ slug });
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.thumbnail = thumbnail || course.thumbnail;
    course.logo = logo || course.logo;
    course.originalPrice = originalPrice || course.originalPrice;
    course.discountPercent = discountPercent || course.discountPercent;
    course.category = category || course.category;
    course.level = level || course.level;
    course.duration = duration || course.duration;
    course.features = features || course.features;
    course.certificate = certificate ?? course.certificate;

    await course.save();

    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update course metadata' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const { slug } = await params;
    const body = await request.json();
    const { isPublished } = body;

    const updatedCourse = await Course.findOneAndUpdate(
      { slug },
      { isPublished },
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Publish status updated",
      isPublished: updatedCourse.isPublished,
    });
  } catch (error) {
    console.error("Error updating Course:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}