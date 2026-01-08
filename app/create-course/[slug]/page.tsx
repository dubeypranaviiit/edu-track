'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {  Course, Subtopic, Item } from '@/types/course'
import ChapterSection from '@/components/Course/Course-Edit/ChapterSection'
 import { useParams } from 'next/navigation'
interface Props {
  courseId: string
}

const page= () => {
   const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/create-course/${slug}`)
      console.log(res.data.course._doc);
      setCourse(res.data.course._doc)
    } catch (err) {
      console.error('Failed to fetch course:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourse()
  }, [slug])

  const handleUpdateCourseMeta = async () => {
    try {
      await axios.put(`/api/create-course/${slug}`, {
        title: course?.title,
        description: course?.description,
        category: course?.category,
        level: course?.level,
        // thumbnail: course?.thumbnail,
        originalPrice: course?.originalPrice,
        discountPercent: course?.discountPercent,
        duration: course?.duration,
      })
      alert('Course updated!')
    } catch (err) {
      console.error(err)
      alert('Update failed!')
    }
  }
  if (loading || !course) return <p>Loading...</p>
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Edit Course</h1>
      {/* Course Metadata */}
      <div className="space-y-4 bg-white shadow p-4 rounded-xl border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input disabled value={course.slug} />
          </div>
      
          <div>
            <Label>Duration</Label>
            <Input value={course.duration} onChange={e => setCourse({ ...course, duration: e.target.value })} />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={course.originalPrice}
              onChange={e => setCourse({ ...course, originalPrice: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label>Discount (%)</Label>
            <Input
              type="number"
              value={course.discountPercent}
              onChange={e => setCourse({ ...course, discountPercent: Number(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} />
        </div>
        <div className="text-right">
          <Button onClick={handleUpdateCourseMeta}>Save Metadata</Button>
        </div>
      </div>
      <ChapterSection courseId={slug} chapters={course.chapters} onUpdate={fetchCourse} />
    </div>
  )
}

export default page
