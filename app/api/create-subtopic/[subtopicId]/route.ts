import { connectDB } from "@/lib/mongoose";
import Course from "@/models/Course/course";
import Chapter from "@/models/Course/chapter";
import Subtopic from "@/models/Course/subTopic";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import Item from '@/models/Course/item'; 
export async function POST(req: NextRequest, { params }: { params: { subtopicId: string } }) {
    const { subtopicId } = params
    const { title, type, content, videoUrl, file } = await req.json()
  
    try {
      await connectDB()
  
      // Find subtopic by ID
      const subtopic = await Subtopic.findById(subtopicId)
      if (!subtopic) {
        return NextResponse.json({ message: 'Subtopic not found' }, { status: 404 })
      }
  
      let fileUrl: string | undefined
      if (file) {
        // Handle file upload (for assignments)
        const uploadResult = await cloudinary.uploader.upload(file, {
          folder: 'assignments',
          resource_type: 'auto',
        })
        fileUrl = uploadResult.secure_url
      }
  
      // Create new item
      const newItem = new Item({
        title,
        type,
        content,
        videoUrl: type === 'video' ? videoUrl : undefined,
        resources: type === 'assignment' ? [fileUrl] : [],
      })
  
      await newItem.save()
  
      // Add item to subtopic
      subtopic.items.push(newItem._id)
      await subtopic.save()
  
      return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Failed to add item' }, { status: 500 })
    }
  }