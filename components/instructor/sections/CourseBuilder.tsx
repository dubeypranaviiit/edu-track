'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import useInstructorId from '@/lib/hooks/useInstructorId'

export default function CourseBuilder() {
  const instructorId = useInstructorId()

  const [courseData, setCourseData] = useState({
    title: '',
    slug: '',
    description: '',
    originalPrice: '',
    discountPercent: '',
    category: '',
    level: 'beginner',
    duration: '',
    features: '',
    certificate: false,
  })

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedCourse = localStorage.getItem('courseData')
    if (savedCourse) setCourseData(JSON.parse(savedCourse))
  }, [])

  useEffect(() => {
    localStorage.setItem('courseData', JSON.stringify(courseData))
  }, [courseData])

  const updateCourseField = <K extends keyof typeof courseData>(
    field: K,
    value: typeof courseData[K]
  ) => {
    setCourseData(prev => ({ ...prev, [field]: value }))
  }

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setThumbnailFile(e.target.files[0])
  }

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setLogoFile(e.target.files[0])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!instructorId) return alert("Instructor not loaded yet")
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', courseData.title)
      formData.append('slug', courseData.slug)
      formData.append('description', courseData.description)
      formData.append('originalPrice', courseData.originalPrice)
      formData.append('discountPercent', courseData.discountPercent)
      formData.append('instructor', instructorId)
      formData.append('category', courseData.category)
      formData.append('level', courseData.level)
      formData.append('duration', courseData.duration)
      formData.append('certificate', courseData.certificate ? 'true' : 'false')
      formData.append('features', courseData.features)

      if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
      if (logoFile) formData.append('logo', logoFile)

      const res = await axios.post('/api/create-course', formData)
      alert('🎉 Course successfully created!')

      // Reset form
      setCourseData({
        title: '',
        slug: '',
        description: '',
        originalPrice: '',
        discountPercent: '',
        category: '',
        level: 'beginner',
        duration: '',
        features: '',
        certificate: false,
      })
      setThumbnailFile(null)
      setLogoFile(null)
      console.log(res.data)
    } catch (err: any) {
      console.error('Error:', err.response?.data || err.message)
      alert('Error creating course. Check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Title" value={courseData.title} onChange={e => updateCourseField('title', e.target.value)} required />
        <Input placeholder="Slug (unique)" value={courseData.slug} onChange={e => updateCourseField('slug', e.target.value)} required />
        <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={e => updateCourseField('originalPrice', e.target.value)} required />
        <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={e => updateCourseField('discountPercent', e.target.value)} />
        <Input placeholder="Category" value={courseData.category} onChange={e => updateCourseField('category', e.target.value)} />
        <Input placeholder="Duration" value={courseData.duration} onChange={e => updateCourseField('duration', e.target.value)} />
        <select value={courseData.level} onChange={e => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <Textarea placeholder="Description" value={courseData.description} onChange={e => updateCourseField('description', e.target.value)} />
      <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={e => updateCourseField('features', e.target.value)} />

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={courseData.certificate} onChange={e => updateCourseField('certificate', e.target.checked)} />
        Certificate Included
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <Input type="file" onChange={handleThumbnailChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <Input type="file" onChange={handleLogoChange} />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4" disabled={loading}>
        {loading ? 'Creating Course...' : 'Create Course'}
      </Button>
    </form>
  )
}
