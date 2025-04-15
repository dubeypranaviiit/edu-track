import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import { NextRequest, NextResponse } from "next/server";
import Item from '@/models/Course/item'; 

export async function POST(req: NextRequest, context: { params: { slug: string } }) {
  const { slug } =await context.params;
  const { title } = await req.json()

  try {
    await connectDB()

    // Find course by slug
    const course = await Course.findOne({ slug })
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 })
    }
    const newChapter = new Chapter({
      title,
      course: course._id,
    })
    await newChapter.save()

    // Add chapter to course
    course.chapters.push(newChapter._id)
    await course.save()

    return NextResponse.json(newChapter, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to add chapter' }, { status: 500 })
  }
}
