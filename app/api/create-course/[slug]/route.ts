import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import { NextRequest, NextResponse } from "next/server";
import Item from '@/models/Course/item'; 
const calculateFinalPrice = (originalPrice: number, discountPercent: number): number => {
  if (discountPercent > 0) {
    return originalPrice - (originalPrice * discountPercent) / 100;
  }
  return originalPrice;
};

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
console.log(`Request aaya hai`);
  try {
    await connectDB();
    const {slug} = await context.params;
  
    const course = await Course.findOne({ slug })
      .populate({
        path: 'chapters',
        model: Chapter,
        populate: {
          path: 'subtopics',
          model:Subtopic,
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
  console.log(course);

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
export async function DELETE(req: NextRequest, context: { params: { slug: string } }) {
  try {
    await connectDB();
    const {slug}=await context.params
    const deleted = await Course.findOneAndDelete({ slug:slug });

    if (!deleted) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('[DELETE COURSE ERROR]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest,context: { params: { slug: string } }) {
  const { slug } =await  context.params
  const { title, description, thumbnail, logo, originalPrice, discountPercent, category, level, duration, features, certificate } = await req.json()

  try {
    await connectDB()
    
    // Find the course by slug
    const course = await Course.findOne({ slug })
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 })
    }

  
    course.title = title || course.title
    course.description = description || course.description
    course.thumbnail = thumbnail || course.thumbnail
    course.logo = logo || course.logo
    course.originalPrice = originalPrice || course.originalPrice
    course.discountPercent = discountPercent || course.discountPercent
    course.category = category || course.category
    course.level = level || course.level
    course.duration = duration || course.duration
    course.features = features || course.features
    course.certificate = certificate ?? course.certificate

    await course.save()

    return NextResponse.json(course)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to update course metadata' }, { status: 500 })
  }
}
