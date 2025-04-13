import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { tmpdir } from 'os'
import { v4 as uuidv4 } from 'uuid'
import { Types } from 'mongoose'

import { uploadToCloudinary } from '@/lib/cloudinaryUpload'
import { connectDB } from '@/lib/mongoose'
import Course from '@/models/course'

// Save file temporarily
async function saveTempFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuidv4()}-${file.name}`
  const tempPath = path.join(tmpdir(), filename)
  await writeFile(tempPath, buffer)
  return tempPath
}

export async function POST(req: NextRequest) {
  await connectDB()

  try {
    const formData = await req.formData()

    // Extract fields
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const originalPrice = Number(formData.get('originalPrice'))
    const discountPercent = Number(formData.get('discountPercent'))
    const instructor = formData.get('instructor') as string
    const category = formData.get('category') as string
    const level = formData.get('level') as string
    const duration = formData.get('duration') as string
    const certificate = formData.get('certificate') === 'true'
    const features = JSON.parse(formData.get('features') as string)

    // Validate instructor ObjectId
  

    // Extract files
    const thumbnailFile = formData.get('thumbnail') as File | null
    const logoFile = formData.get('logo') as File | null

    if (!thumbnailFile || !logoFile) {
      return NextResponse.json(
        { error: 'Thumbnail and logo are required' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const tempThumbnailPath = await saveTempFile(thumbnailFile)
    const thumbnailUrl = await uploadToCloudinary(tempThumbnailPath, 'courses/thumbnails');
    console.log(thumbnailUrl);
    await unlink(tempThumbnailPath)

    const tempLogoPath = await saveTempFile(logoFile)
    const logoUrl = await uploadToCloudinary(tempLogoPath, 'courses/logos')
    await unlink(tempLogoPath)

    // Create and save course
    const newCourse = new Course({
      title,
      slug,
      description,
      originalPrice,
      discountPercent,
      instructor,
      category,
      level,
      duration,
      certificate,
      features,
      thumbnail: thumbnailUrl,
      logo: logoUrl,
    })

    await newCourse.save()

    return NextResponse.json({
      success: true,
      course: newCourse,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}

// Function to calculate final price from original price and discount percentage
const calculateFinalPrice = (originalPrice: number, discountPercent: number) => {
  return originalPrice - (originalPrice * discountPercent) / 100
}

export async function GET(req: NextRequest) {
  await connectDB()

  try {
    // Fetch all courses from the database
    const courses = await Course.find().lean()

    // Map through courses and calculate the finalPrice
    const updatedCourses = courses.map((course: any) => ({
      ...course,
      finalPrice: calculateFinalPrice(course.originalPrice, course.discountPercent),
    }))

    // Return courses with finalPrice
    return NextResponse.json({
      success: true,
      courses: updatedCourses,
    })
  } catch (error: any) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: error.message || 'Error fetching courses from database' },
      { status: 500 }
    )
  }
}

