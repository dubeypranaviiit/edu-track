import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import { NextRequest, NextResponse } from "next/server";
import Item from '@/models/Course/item'; 

export async function POST(req: NextRequest, { params }: { params: { chapterId: string } }) {
    // const { chapterId } = params
    const { title,chapterId } = await req.json()
  
    try {
      await connectDB()
  
      // Find the chapter by ID
      const chapter = await Chapter.findById(chapterId)
      if (!chapter) {
        return NextResponse.json({ message: 'Chapter not found' }, { status: 404 })
      }
  
      // Create a new subtopic
      const newSubtopic = new Subtopic({
        title,
        chapter: chapter._id,
      })
  
      await newSubtopic.save()
  
      // Add subtopic to the chapter
      chapter.subtopics.push(newSubtopic._id)
      await chapter.save()
  
      return NextResponse.json(newSubtopic, { status: 201 })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Failed to add subtopic' }, { status: 500 })
    }
  }