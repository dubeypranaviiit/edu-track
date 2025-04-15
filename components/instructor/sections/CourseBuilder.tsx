// // // // // 'use client'

// // // // // import { useState } from 'react'
// // // // // import axios from 'axios'
// // // // // import { Input } from '@/components/ui/input'
// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Textarea } from '@/components/ui/textarea'

// // // // // const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
// // // // // const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

// // // // // interface ItemInput {
// // // // //   title: string
// // // // //   type: 'video' | 'reading' | 'assignment'
// // // // //   videoUrl?: string
// // // // //   content?: string
// // // // //   resources?: string
// // // // // }

// // // // // interface SubtopicInput {
// // // // //   title: string
// // // // //   items: ItemInput[]
// // // // // }

// // // // // interface ChapterInput {
// // // // //   title: string
// // // // //   subtopics: SubtopicInput[]
// // // // // }

// // // // // export default function CourseBuilder() {
// // // // //   const [chapters, setChapters] = useState<ChapterInput[]>([{
// // // // //     title: '',
// // // // //     subtopics: [{
// // // // //       title: '',
// // // // //       items: [{ title: '', type: 'video', videoUrl: '' }]
// // // // //     }]
// // // // //   }])

// // // // //   const [courseData, setCourseData] = useState({
// // // // //     title: '',
// // // // //     slug: '',
// // // // //     description: '',
// // // // //     thumbnail: '',
// // // // //     originalPrice: '',
// // // // //     discountPercent: '',
// // // // //     instructor: '',
// // // // //     category: '',
// // // // //     level: 'beginner',
// // // // //     features: '',
// // // // //     certificate: false,
// // // // //   })

// // // // //   const updateCourseField = (field: string, value: any) => {
// // // // //     setCourseData(prev => ({ ...prev, [field]: value }))
// // // // //   }

// // // // //   const updateChapter = (index: number, key: string, value: string) => {
// // // // //     const newChapters = [...chapters]
// // // // //     (newChapters[index] as any)[key] = value
// // // // //     setChapters(newChapters)
// // // // //   }

// // // // //   const updateSubtopic = (chapterIndex: number, subIndex: number, key: string, value: string) => {
// // // // //     const newChapters = [...chapters]
// // // // //     (newChapters[chapterIndex].subtopics[subIndex] as any)[key] = value
// // // // //     setChapters(newChapters)
// // // // //   }

// // // // //   const updateItem = (chapterIndex: number, subIndex: number, itemIndex: number, key: string, value: string) => {
// // // // //     const newChapters = [...chapters]
// // // // //     (newChapters[chapterIndex].subtopics[subIndex].items[itemIndex] as any)[key] = value
// // // // //     setChapters(newChapters)
// // // // //   }

// // // // //   const addChapter = () => {
// // // // //     setChapters([...chapters, {
// // // // //       title: '',
// // // // //       subtopics: [{ title: '', items: [{ title: '', type: 'video', videoUrl: '' }] }]
// // // // //     }])
// // // // //   }

// // // // //   const addSubtopic = (chapterIndex: number) => {
// // // // //     const newChapters = [...chapters]
// // // // //     newChapters[chapterIndex].subtopics.push({ title: '', items: [{ title: '', type: 'video', videoUrl: '' }] })
// // // // //     setChapters(newChapters)
// // // // //   }

// // // // //   const addItem = (chapterIndex: number, subIndex: number) => {
// // // // //     const newChapters = [...chapters]
// // // // //     newChapters[chapterIndex].subtopics[subIndex].items.push({ title: '', type: 'video', videoUrl: '' })
// // // // //     setChapters(newChapters)
// // // // //   }

// // // // //   const handleVideoUpload = async (file: File, chapterIdx: number, subIdx: number, itemIdx: number) => {
// // // // //     const formData = new FormData()
// // // // //     formData.append('file', file)
// // // // //     formData.append('upload_preset', uploadPreset || '')
// // // // //     formData.append('folder', 'course-videos')

// // // // //     try {
// // // // //       const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, formData)
// // // // //       const secureUrl = res.data.secure_url
// // // // //       updateItem(chapterIdx, subIdx, itemIdx, 'videoUrl', secureUrl)
// // // // //       alert('Video uploaded successfully!')
// // // // //     } catch (err) {
// // // // //       console.error('Upload failed', err)
// // // // //       alert('Video upload failed. Try again.')
// // // // //     }
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()

// // // // //     const payload = {
// // // // //       ...courseData,
// // // // //       originalPrice: Number(courseData.originalPrice),
// // // // //       discountPercent: Number(courseData.discountPercent),
// // // // //       features: courseData.features.split(',').map(f => f.trim()),
// // // // //       certificate: courseData.certificate,
// // // // //       chapters,
// // // // //     }

// // // // //     try {
// // // // //       const { data } = await axios.post('/api/courses', payload)
// // // // //       console.log('Course created:', data)
// // // // //       alert('🎉 Course successfully created!')
// // // // //     } catch (err: any) {
// // // // //       console.error('Error:', err.response?.data || err.message)
// // // // //       alert('Error creating course. Check console.')
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <form
// // // // //       onSubmit={handleSubmit}
// // // // //       className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow"
// // // // //     >
// // // // //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// // // // //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// // // // //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// // // // //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// // // // //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// // // // //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// // // // //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// // // // //           <option value="beginner">Beginner</option>
// // // // //           <option value="intermediate">Intermediate</option>
// // // // //           <option value="advanced">Advanced</option>
// // // // //         </select>
// // // // //       </div>

// // // // //       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
// // // // //       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

// // // // //       <label className="flex items-center gap-2">
// // // // //         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
// // // // //         Certificate Included
// // // // //       </label>

// // // // //       <h3 className="text-2xl font-semibold mt-6">Chapters & Subtopics</h3>
// // // // //       {chapters.map((chapter, chapterIdx) => (
// // // // //         <div key={chapterIdx} className="p-4 border rounded-xl bg-gray-100 space-y-4">
// // // // //           <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
// // // // //           {chapter.subtopics.map((sub, subIdx) => (
// // // // //             <div key={subIdx} className="pl-4 border-l space-y-2">
// // // // //               <Input placeholder="Subtopic Title" value={sub.title} onChange={(e) => updateSubtopic(chapterIdx, subIdx, 'title', e.target.value)} />
// // // // //               {sub.items.map((item, itemIdx) => (
// // // // //                 <div key={itemIdx} className="pl-4 space-y-1">
// // // // //                   <Input placeholder="Item Title" value={item.title} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'title', e.target.value)} required />
// // // // //                   <select value={item.type} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'type', e.target.value)} className="border rounded px-2 py-1">
// // // // //                     <option value="video">Video</option>
// // // // //                     <option value="reading">Reading</option>
// // // // //                     <option value="assignment">Assignment</option>
// // // // //                   </select>

// // // // //                   {item.type === 'video' && (
// // // // //                     <>
// // // // //                       <Input placeholder="Video URL" value={item.videoUrl} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'videoUrl', e.target.value)} />
// // // // //                       <input
// // // // //                         type="file"
// // // // //                         accept="video/*"
// // // // //                         onChange={(e) => {
// // // // //                           const file = e.target.files?.[0]
// // // // //                           if (file) {
// // // // //                             handleVideoUpload(file, chapterIdx, subIdx, itemIdx)
// // // // //                           }
// // // // //                         }}
// // // // //                       />
// // // // //                     </>
// // // // //                   )}

// // // // //                   {item.type !== 'video' && (
// // // // //                     <Textarea placeholder="Content" value={item.content} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'content', e.target.value)} />
// // // // //                   )}

// // // // //                   <Input placeholder="Resources (comma separated)" value={item.resources || ''} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'resources', e.target.value)} />
// // // // //                 </div>
// // // // //               ))}
// // // // //               <Button type="button" onClick={() => addItem(chapterIdx, subIdx)} variant="outline">+ Add Item</Button>
// // // // //             </div>
// // // // //           ))}
// // // // //           <Button type="button" onClick={() => addSubtopic(chapterIdx)} variant="secondary">+ Add Subtopic</Button>
// // // // //         </div>
// // // // //       ))}

// // // // //       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>
// // // // //       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4">Create Course</Button>
// // // // //     </form>
// // // // //   )
// // // // // }
// // // // 'use client'

// // // // import { useState } from 'react'
// // // // import axios from 'axios'
// // // // import { Input } from '@/components/ui/input'
// // // // import { Button } from '@/components/ui/button'
// // // // import { Textarea } from '@/components/ui/textarea'

// // // // interface ItemInput {
// // // //   title: string
// // // //   type: 'video' | 'reading' | 'assignment'
// // // //   videoFile?: File
// // // //   content?: string
// // // //   resources?: string
// // // // }

// // // // interface SubtopicInput {
// // // //   title: string
// // // //   items: ItemInput[]
// // // // }

// // // // interface ChapterInput {
// // // //   title: string
// // // //   subtopics: SubtopicInput[]
// // // // }

// // // // export default function CourseBuilder() {
// // // //   const [chapters, setChapters] = useState<ChapterInput[]>([{
// // // //     title: '',
// // // //     subtopics: [{
// // // //       title: '',
// // // //       items: [{ title: '', type: 'video' }]
// // // //     }]
// // // //   }])

// // // //   const [courseData, setCourseData] = useState({
// // // //     title: '',
// // // //     slug: '',
// // // //     description: '',
// // // //     originalPrice: '',
// // // //     discountPercent: '',
// // // //     instructor: '',
// // // //     category: '',
// // // //     level: 'beginner',
// // // //     features: '',
// // // //     certificate: false,
// // // //   })

// // // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
// // // //   const [logoFile, setLogoFile] = useState<File | null>(null)

// // // //   const updateCourseField = (field: string, value: any) => {
// // // //     setCourseData(prev => ({ ...prev, [field]: value }))
// // // //   }

// // // //   const updateChapter = (index: number, key: string, value: string) => {
// // // //     const newChapters = [...chapters]
// // // //     ;(newChapters[index] as any)[key] = value
// // // //     setChapters(newChapters)
// // // //   }

// // // //   const updateSubtopic = (chapterIndex: number, subIndex: number, key: string, value: string) => {
// // // //     const newChapters = [...chapters]
// // // //     ;(newChapters[chapterIndex].subtopics[subIndex] as any)[key] = value
// // // //     setChapters(newChapters)
// // // //   }

// // // //   const updateItem = (chapterIndex: number, subIndex: number, itemIndex: number, key: string, value: any) => {
// // // //     const newChapters = [...chapters]
// // // //     ;(newChapters[chapterIndex].subtopics[subIndex].items[itemIndex] as any)[key] = value
// // // //     setChapters(newChapters)
// // // //   }

// // // //   const addChapter = () => {
// // // //     setChapters([...chapters, {
// // // //       title: '',
// // // //       subtopics: [{ title: '', items: [{ title: '', type: 'video' }] }]
// // // //     }])
// // // //   }

// // // //   const addSubtopic = (chapterIndex: number) => {
// // // //     const newChapters = [...chapters]
// // // //     newChapters[chapterIndex].subtopics.push({ title: '', items: [{ title: '', type: 'video' }] })
// // // //     setChapters(newChapters)
// // // //   }

// // // //   const addItem = (chapterIndex: number, subIndex: number) => {
// // // //     const newChapters = [...chapters]
// // // //     newChapters[chapterIndex].subtopics[subIndex].items.push({ title: '', type: 'video' })
// // // //     setChapters(newChapters)
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()

// // // //     const formData = new FormData()

// // // //     formData.append('title', courseData.title)
// // // //     formData.append('slug', courseData.slug)
// // // //     formData.append('description', courseData.description)
// // // //     formData.append('originalPrice', courseData.originalPrice)
// // // //     formData.append('discountPercent', courseData.discountPercent)
// // // //     formData.append('instructor', courseData.instructor)
// // // //     formData.append('category', courseData.category)
// // // //     formData.append('level', courseData.level)
// // // //     formData.append('certificate', String(courseData.certificate))
// // // //     formData.append('features', courseData.features)
// // // //     if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
// // // //     if (logoFile) formData.append('logo', logoFile)

// // // //     // Add chapters structure and files
// // // //     formData.append('chapters', JSON.stringify(chapters.map(chapter => ({
// // // //       ...chapter,
// // // //       subtopics: chapter.subtopics.map(sub => ({
// // // //         ...sub,
// // // //         items: sub.items.map(item => ({
// // // //           ...item,
// // // //           videoFile: undefined // remove the actual File for serialization
// // // //         }))
// // // //       }))
// // // //     }))))

// // // //     // Append video files separately
// // // //     chapters.forEach((chapter, cIdx) => {
// // // //       chapter.subtopics.forEach((sub, sIdx) => {
// // // //         sub.items.forEach((item, iIdx) => {
// // // //           if (item.type === 'video' && item.videoFile) {
// // // //             formData.append(`video_${cIdx}_${sIdx}_${iIdx}`, item.videoFile)
// // // //           }
// // // //         })
// // // //       })
// // // //     })

// // // //     try {
// // // //       const res = await axios.post('/api/courses', formData, {
// // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // //       })
// // // //       alert('🎉 Course successfully created!')
// // // //     } catch (err: any) {
// // // //       console.error('Error:', err.response?.data || err.message)
// // // //       alert('Error creating course. Check console.')
// // // //     }
// // // //   }

// // // //   return (
// // // //     <form
// // // //       onSubmit={handleSubmit}
// // // //       className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow"
// // // //     >
// // // //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// // // //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// // // //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// // // //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// // // //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// // // //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// // // //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// // // //           <option value="beginner">Beginner</option>
// // // //           <option value="intermediate">Intermediate</option>
// // // //           <option value="advanced">Advanced</option>
// // // //         </select>
// // // //       </div>

// // // //       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
// // // //       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

// // // //       <label className="flex items-center gap-2">
// // // //         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
// // // //         Certificate Included
// // // //       </label>

// // // //       <Input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} />
// // // //       <p className="text-sm">Upload Course Thumbnail</p>

// // // //       <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
// // // //       <p className="text-sm">Upload Course Logo</p>

// // // //       <h3 className="text-2xl font-semibold mt-6">Chapters & Subtopics</h3>
// // // //       {chapters.map((chapter, chapterIdx) => (
// // // //         <div key={chapterIdx} className="p-4 border rounded-xl bg-gray-100 space-y-4">
// // // //           <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
// // // //           {chapter.subtopics.map((sub, subIdx) => (
// // // //             <div key={subIdx} className="pl-4 border-l space-y-2">
// // // //               <Input placeholder="Subtopic Title" value={sub.title} onChange={(e) => updateSubtopic(chapterIdx, subIdx, 'title', e.target.value)} />
// // // //               {sub.items.map((item, itemIdx) => (
// // // //                 <div key={itemIdx} className="pl-4 space-y-1">
// // // //                   <Input placeholder="Item Title" value={item.title} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'title', e.target.value)} required />
// // // //                   <select value={item.type} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'type', e.target.value)} className="border rounded px-2 py-1">
// // // //                     <option value="video">Video</option>
// // // //                     <option value="reading">Reading</option>
// // // //                     <option value="assignment">Assignment</option>
// // // //                   </select>

// // // //                   {item.type === 'video' && (
// // // //                     <input type="file" accept="video/*" onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'videoFile', e.target.files?.[0] || null)} />
// // // //                   )}

// // // //                   {item.type !== 'video' && (
// // // //                     <Textarea placeholder="Content" value={item.content} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'content', e.target.value)} />
// // // //                   )}

// // // //                   <Input placeholder="Resources (comma separated)" value={item.resources || ''} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'resources', e.target.value)} />
// // // //                 </div>
// // // //               ))}
// // // //               <Button type="button" onClick={() => addItem(chapterIdx, subIdx)} variant="outline">+ Add Item</Button>
// // // //             </div>
// // // //           ))}
// // // //           <Button type="button" onClick={() => addSubtopic(chapterIdx)} variant="secondary">+ Add Subtopic</Button>
// // // //         </div>
// // // //       ))}

// // // //       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>
// // // //       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4">Create Course</Button>
// // // //     </form>
// // // //   )
// // // // }

// // // // // 'use client'

// // // // // import { useState } from 'react'
// // // // // import axios from 'axios'
// // // // // import { Input } from '@/components/ui/input'
// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Textarea } from '@/components/ui/textarea'

// // // // // interface ItemInput {
// // // // //   title: string
// // // // //   type: 'video' | 'reading' | 'assignment'
// // // // //   videoFile?: File
// // // // //   content?: string
// // // // //   resources?: string
// // // // // }

// // // // // interface SubtopicInput {
// // // // //   title: string
// // // // //   items: ItemInput[]
// // // // // }

// // // // // interface ChapterInput {
// // // // //   title: string
// // // // //   subtopics: SubtopicInput[]
// // // // // }

// // // // // export default function CourseBuilder() {
// // // // //   const [chapters, setChapters] = useState<ChapterInput[]>([{
// // // // //     title: '',
// // // // //     subtopics: [{
// // // // //       title: '',
// // // // //       items: [{ title: '', type: 'video' }]
// // // // //     }]
// // // // //   }])

// // // // //   const [courseData, setCourseData] = useState({
// // // // //     title: '',
// // // // //     slug: '',
// // // // //     description: '',
// // // // //     originalPrice: '',
// // // // //     discountPercent: '',
// // // // //     instructor: '',
// // // // //     category: '',
// // // // //     level: 'beginner',
// // // // //     features: '',
// // // // //     certificate: false,
// // // // //   })

// // // // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
// // // // //   const [logoFile, setLogoFile] = useState<File | null>(null)

// // // // //   const updateCourseField = (field: string, value: any) => {
// // // // //     setCourseData(prev => ({ ...prev, [field]: value }))
// // // // //   }

// // // // //   const updateChapter = (index: number, key: string, value: string) => {
// // // // //     setChapters(prevChapters => {
// // // // //       const newChapters = [...prevChapters]
// // // // //       (newChapters[index] as any)[key] = value
// // // // //       return newChapters
// // // // //     })
// // // // //   }

// // // // //   const updateSubtopic = (chapterIndex: number, subIndex: number, key: string, value: string) => {
// // // // //     setChapters(prevChapters => {
// // // // //       const newChapters = [...prevChapters]
// // // // //       newChapters[chapterIndex].subtopics[subIndex][key] = value
// // // // //       return newChapters
// // // // //     })
// // // // //   }

// // // // //   const updateItem = (chapterIndex: number, subIndex: number, itemIndex: number, key: string, value: any) => {
// // // // //     setChapters(prevChapters => {
// // // // //       const newChapters = [...prevChapters]
// // // // //       newChapters[chapterIndex].subtopics[subIndex].items[itemIndex][key] = value
// // // // //       return newChapters
// // // // //     })
// // // // //   }

// // // // //   const addChapter = () => {
// // // // //     setChapters(prevChapters => [
// // // // //       ...prevChapters,
// // // // //       { title: '', subtopics: [{ title: '', items: [{ title: '', type: 'video' }] }] }
// // // // //     ])
// // // // //   }

// // // // //   const addSubtopic = (chapterIndex: number) => {
// // // // //     setChapters(prevChapters => {
// // // // //       const newChapters = [...prevChapters]
// // // // //       newChapters[chapterIndex].subtopics.push({ title: '', items: [{ title: '', type: 'video' }] })
// // // // //       return newChapters
// // // // //     })
// // // // //   }

// // // // //   const addItem = (chapterIndex: number, subIndex: number) => {
// // // // //     setChapters(prevChapters => {
// // // // //       const newChapters = [...prevChapters]
// // // // //       newChapters[chapterIndex].subtopics[subIndex].items.push({ title: '', type: 'video' })
// // // // //       return newChapters
// // // // //     })
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()

// // // // //     const formData = new FormData()

// // // // //     // Append course data fields
// // // // //     Object.keys(courseData).forEach(key => {
// // // // //       formData.append(key, courseData[key as keyof typeof courseData])
// // // // //     })

// // // // //     if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
// // // // //     if (logoFile) formData.append('logo', logoFile)

// // // // //     // Add chapters structure and files (without video files)
// // // // //     formData.append('chapters', JSON.stringify(chapters.map(chapter => ({
// // // // //       ...chapter,
// // // // //       subtopics: chapter.subtopics.map(sub => ({
// // // // //         ...sub,
// // // // //         items: sub.items.map(item => ({
// // // // //           ...item,
// // // // //           videoFile: undefined // Ensure videoFile is not added to the formData
// // // // //         }))
// // // // //       }))
// // // // //     }))))

// // // // //     // Append video files separately
// // // // //     chapters.forEach((chapter, cIdx) => {
// // // // //       chapter.subtopics.forEach((sub, sIdx) => {
// // // // //         sub.items.forEach((item, iIdx) => {
// // // // //           if (item.type === 'video' && item.videoFile) {
// // // // //             // Safely append video file only if it exists
// // // // //             formData.append(`video_${cIdx}_${sIdx}_${iIdx}`, item.videoFile)
// // // // //           }
// // // // //         })
// // // // //       })
// // // // //     })

// // // // //     try {
// // // // //       const res = await axios.post('/api/courses', formData, {
// // // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // // //       })
// // // // //       alert('🎉 Course successfully created!')
// // // // //     } catch (err: any) {
// // // // //       console.error('Error:', err.response?.data || err.message)
// // // // //       alert('Error creating course. Check console.')
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <form
// // // // //       onSubmit={handleSubmit}
// // // // //       className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow"
// // // // //     >
// // // // //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// // // // //       {/* Form Fields for Course Data */}
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// // // // //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// // // // //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// // // // //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// // // // //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// // // // //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// // // // //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// // // // //           <option value="beginner">Beginner</option>
// // // // //           <option value="intermediate">Intermediate</option>
// // // // //           <option value="advanced">Advanced</option>
// // // // //         </select>
// // // // //       </div>

// // // // //       {/* Form Fields for Description, Features, etc. */}
// // // // //       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
// // // // //       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />
      
// // // // //       {/* Certificate and File Inputs */}
// // // // //       <label className="flex items-center gap-2">
// // // // //         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
// // // // //         Certificate Included
// // // // //       </label>

// // // // //       <Input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} />
// // // // //       <p className="text-sm">Upload Course Thumbnail</p>

// // // // //       <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
// // // // //       <p className="text-sm">Upload Course Logo</p>

// // // // //       {/* Chapters & Subtopics Section */}
// // // // //       <h3 className="text-2xl font-semibold mt-6">Chapters & Subtopics</h3>
// // // // //       {chapters.map((chapter, chapterIdx) => (
// // // // //         <div key={chapterIdx} className="p-4 border rounded-xl bg-gray-100 space-y-4">
// // // // //           <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
// // // // //           {chapter.subtopics.map((sub, subIdx) => (
// // // // //             <div key={subIdx} className="pl-4 border-l space-y-2">
// // // // //               <Input placeholder="Subtopic Title" value={sub.title} onChange={(e) => updateSubtopic(chapterIdx, subIdx, 'title', e.target.value)} />
// // // // //               {sub.items.map((item, itemIdx) => (
// // // // //                 <div key={itemIdx} className="pl-4 space-y-1">
// // // // //                   <Input placeholder="Item Title" value={item.title} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'title', e.target.value)} required />
// // // // //                   <select value={item.type} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'type', e.target.value)} className="border rounded px-2 py-1">
// // // // //                     <option value="video">Video</option>
// // // // //                     <option value="reading">Reading</option>
// // // // //                     <option value="assignment">Assignment</option>
// // // // //                   </select>

// // // // //                   {item.type === 'video' && (
// // // // //                     <input type="file" accept="video/*" onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'videoFile', e.target.files?.[0] || null)} />
// // // // //                   )}

// // // // //                   {item.type !== 'video' && (
// // // // //                     <Textarea placeholder="Content" value={item.content} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'content', e.target.value)} />
// // // // //                   )}

// // // // //                   <Input placeholder="Resources (comma separated)" value={item.resources || ''} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'resources', e.target.value)} />
// // // // //                 </div>
// // // // //               ))}
// // // // //               <Button type="button" onClick={() => addItem(chapterIdx, subIdx)} variant="outline">+ Add Item</Button>
// // // // //             </div>
// // // // //           ))}
// // // // //           <Button type="button" onClick={() => addSubtopic(chapterIdx)} variant="secondary">+ Add Subtopic</Button>
// // // // //         </div>
// // // // //       ))}

// // // // //       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>
// // // // //       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4">Create Course</Button>
// // // // //     </form>
// // // // //   )
// // // // // }
// // // 'use client'

// // // import { useState } from 'react'
// // // import axios from 'axios'
// // // import { Input } from '@/components/ui/input'
// // // import { Button } from '@/components/ui/button'
// // // import { Textarea } from '@/components/ui/textarea'

// // // interface ItemInput {
// // //   title: string
// // //   type: 'video' | 'reading' | 'assignment'
// // //   videoFile?: File | null
// // //   content?: string
// // //   resources?: string
// // // }

// // // interface SubtopicInput {
// // //   title: string
// // //   items: ItemInput[]
// // // }

// // // interface ChapterInput {
// // //   title: string
// // //   subtopics: SubtopicInput[]
// // // }

// // // export default function CourseBuilder() {
// // //   const [chapters, setChapters] = useState<ChapterInput[]>([{
// // //     title: '',
// // //     subtopics: [{
// // //       title: '',
// // //       items: [{ title: '', type: 'video', videoFile: null }]
// // //     }]
// // //   }])

// // //   const [courseData, setCourseData] = useState({
// // //     title: '',
// // //     slug: '',
// // //     description: '',
// // //     originalPrice: '',
// // //     discountPercent: '',
// // //     instructor: '',
// // //     category: '',
// // //     level: 'beginner',
// // //     features: '',
// // //     certificate: false,
// // //   })

// // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
// // //   const [logoFile, setLogoFile] = useState<File | null>(null)
// // //   const [loading, setLoading] = useState(false)

// // //   const updateCourseField = (field: string, value: any) => {
// // //     setCourseData(prev => ({ ...prev, [field]: value }))
// // //   }

// // //   const updateChapter = (index: number, key: string, value: string) => {
// // //     const newChapters = [...chapters]
// // //     ;(newChapters[index] as any)[key] = value
// // //     setChapters(newChapters)
// // //   }

// // //   const updateSubtopic = (chapterIndex: number, subIndex: number, key: string, value: string) => {
// // //     const newChapters = [...chapters]
// // //     ;(newChapters[chapterIndex].subtopics[subIndex] as any)[key] = value
// // //     setChapters(newChapters)
// // //   }

// // //   const updateItem = (chapterIndex: number, subIndex: number, itemIndex: number, key: string, value: any) => {
// // //     const newChapters = [...chapters]
// // //     ;(newChapters[chapterIndex].subtopics[subIndex].items[itemIndex] as any)[key] = value
// // //     setChapters(newChapters)
// // //   }

// // //   const addChapter = () => {
// // //     setChapters([...chapters, {
// // //       title: '',
// // //       subtopics: [{ title: '', items: [{ title: '', type: 'video', videoFile: null }] }]
// // //     }])
// // //   }

// // //   const addSubtopic = (chapterIndex: number) => {
// // //     const newChapters = [...chapters]
// // //     newChapters[chapterIndex].subtopics.push({ title: '', items: [{ title: '', type: 'video', videoFile: null }] })
// // //     setChapters(newChapters)
// // //   }

// // //   const addItem = (chapterIndex: number, subIndex: number) => {
// // //     const newChapters = [...chapters]
// // //     newChapters[chapterIndex].subtopics[subIndex].items.push({ title: '', type: 'video', videoFile: null })
// // //     setChapters(newChapters)
// // //   }

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     setLoading(true)

// // //     const formData = new FormData()
// // //     formData.append('title', courseData.title)
// // //     formData.append('slug', courseData.slug)
// // //     formData.append('description', courseData.description)
// // //     formData.append('originalPrice', courseData.originalPrice)
// // //     formData.append('discountPercent', courseData.discountPercent)
// // //     formData.append('instructor', courseData.instructor)
// // //     formData.append('category', courseData.category)
// // //     formData.append('level', courseData.level)
// // //     formData.append('certificate', String(courseData.certificate))
// // //     formData.append('features', JSON.stringify(courseData.features.split(',').map(f => f.trim())))
// // //     if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
// // //     if (logoFile) formData.append('logo', logoFile)

// // //     formData.append('chapters', JSON.stringify(
// // //       chapters.map((chapter, cIdx) => ({
// // //         ...chapter,
// // //         subtopics: chapter.subtopics.map((sub, sIdx) => ({
// // //           ...sub,
// // //           items: sub.items.map((item, iIdx) => {
// // //             if (item.type === 'video' && item.videoFile) {
// // //               formData.append(`video_${cIdx}_${sIdx}_${iIdx}`, item.videoFile as File)
// // //             }
// // //             return { ...item, videoFile: undefined }
// // //           })
// // //         }))
// // //       }))
// // //     ))

// // //     try {
// // //       const res = await axios.post('/api/courses', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' }
// // //       })
// // //       alert('🎉 Course successfully created!')
// // //     } catch (err: any) {
// // //       console.error('Error:', err.response?.data || err.message)
// // // //       alert('Error creating course. Check console.')
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //     <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
// // // //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// // // //       {/* Course Details */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// // // //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// // // //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// // // //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// // // //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// // // //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// // // //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// // // //           <option value="beginner">Beginner</option>
// // // //           <option value="intermediate">Intermediate</option>
// // // //           <option value="advanced">Advanced</option>
// // // //         </select>
// // // //       </div>

// // // //       {/* Course Description & Features */}
// // // //       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
// // // //       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

// // // //       {/* Certificate Checkbox */}
// // // //       <label className="flex items-center gap-2">
// // // //         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
// // // //         Certificate Included
// // // //       </label>

// // // //       {/* File Uploads */}
// // // //       <Input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} />
// // // //       <p className="text-sm">Upload Course Thumbnail</p>

// // // //       <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
// // // //       <p className="text-sm">Upload Course Logo</p>

// // // //       {/* Chapters & Subtopics */}
// // // //       <h3 className="text-2xl font-semibold mt-6">Chapters & Subtopics</h3>
// // // //       {chapters.map((chapter, chapterIdx) => (
// // // //         <div key={chapterIdx} className="p-4 border rounded-xl bg-gray-100 space-y-4">
// // // //           <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
// // // //           {chapter.subtopics.map((sub, subIdx) => (
// // // //             <div key={subIdx} className="pl-4 border-l space-y-2">
// // // //               <Input placeholder="Subtopic Title" value={sub.title} onChange={(e) => updateSubtopic(chapterIdx, subIdx, 'title', e.target.value)} />
// // // //               {sub.items.map((item, itemIdx) => (
// // // //                 <div key={itemIdx} className="pl-4 space-y-1">
// // // //                   <Input placeholder="Item Title" value={item.title} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'title', e.target.value)} required />
// // // //                   <select value={item.type} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'type', e.target.value)} className="border rounded px-2 py-1">
// // // //                     <option value="video">Video</option>
// // // //                     <option value="reading">Reading</option>
// // // //                     <option value="assignment">Assignment</option>
// // // //                   </select>

// // // //                   {item.type === 'video' && (
// // // //                     <input type="file" accept="video/*" onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'videoFile', e.target.files?.[0] || null)} />
// // // //                   )}

// // // //                   {item.type !== 'video' && (
// // // //                     <Textarea placeholder="Content" value={item.content || ''} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'content', e.target.value)} />
// // // //                   )}

// // // //                   <Input placeholder="Resources (comma separated)" value={item.resources || ''} onChange={(e) => updateItem(chapterIdx, subIdx, itemIdx, 'resources', e.target.value)} />
// // // //                 </div>
// // // //               ))}
// // // //               <Button type="button" onClick={() => addItem(chapterIdx, subIdx)} variant="outline">+ Add Item</Button>
// // // //             </div>
// // // //           ))}
// // // //           <Button type="button" onClick={() => addSubtopic(chapterIdx)} variant="secondary">+ Add Subtopic</Button>
// // // //         </div>
// // // //       ))}

// // // //       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>

// // // //       {/* Submit Button */}
// // // //       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4" disabled={loading}>
// // // //         {loading ? 'Creating Course...' : 'Create Course'}
// // // //       </Button>
// // // //     </form>
// // // //   )
// // // // }
// // // 'use client'

// // // import { useState, useEffect } from 'react'
// // // import axios from 'axios'
// // // import { Input } from '@/components/ui/input'
// // // import { Button } from '@/components/ui/button'
// // // import { Textarea } from '@/components/ui/textarea'
// // // import { DndContext, closestCenter } from '@dnd-kit/core'
// // // import {
// // //   arrayMove,
// // //   SortableContext,
// // //   verticalListSortingStrategy,
// // //   useSortable,
// // // } from '@dnd-kit/sortable'
// // // import { CSS } from '@dnd-kit/utilities'

// // // interface ItemInput {
// // //   title: string
// // //   type: 'video' | 'reading' | 'assignment'
// // //   videoFile?: File | null
// // //   content?: string
// // //   resources?: string
// // // }

// // // interface ChapterInput {
// // //   title: string
// // //   items: ItemInput[]
// // // }

// // // function SortableItem({ id, children }: { id: number; children: React.ReactNode }) {
// // //   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

// // //   const style = {
// // //     transform: CSS.Transform.toString(transform),
// // //     transition,
// // //   }

// // //   return (
// // //     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
// // //       {children}
// // //     </div>
// // //   )
// // // }

// // // export default function CourseBuilder() {
// // //   const [chapters, setChapters] = useState<ChapterInput[]>([])
// // //   const [courseData, setCourseData] = useState({
// // //     title: '',
// // //     slug: '',
// // //     description: '',
// // //     originalPrice: '',
// // //     discountPercent: '',
// // //     instructor: '',
// // //     category: '',
// // //     level: 'beginner',
// // //     features: '',
// // //     certificate: false,
// // //   })
// // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
// // //   const [logoFile, setLogoFile] = useState<File | null>(null)
// // //   const [loading, setLoading] = useState(false)
// // //   const [preview, setPreview] = useState(false)

// // //   useEffect(() => {
// // //     const savedCourse = localStorage.getItem('courseData')
// // //     const savedChapters = localStorage.getItem('chapters')
// // //     if (savedCourse) setCourseData(JSON.parse(savedCourse))
// // //     if (savedChapters) setChapters(JSON.parse(savedChapters))
// // //   }, [])

// // //   useEffect(() => {
// // //     localStorage.setItem('courseData', JSON.stringify(courseData))
// // //     localStorage.setItem('chapters', JSON.stringify(chapters))
// // //   }, [courseData, chapters])

// // //   const updateCourseField = (field: string, value: any) => {
// // //     setCourseData(prev => ({ ...prev, [field]: value }))
// // //   }

// // //   const updateChapter = (index: number, key: string, value: string) => {
// // //     const newChapters = [...chapters]
// // //     ;(newChapters[index] as any)[key] = value
// // //     setChapters(newChapters)
// // //   }

// // //   const updateItem = (chapterIndex: number, itemIndex: number, key: string, value: any) => {
// // //     const newChapters = [...chapters]
// // //     ;(newChapters[chapterIndex].items[itemIndex] as any)[key] = value
// // //     setChapters(newChapters)
// // //   }

// // //   const addChapter = () => {
// // //     setChapters([...chapters, { title: '', items: [{ title: '', type: 'video', videoFile: null }] }])
// // //   }

// // //   const addItem = (chapterIndex: number) => {
// // //     const newChapters = [...chapters]
// // //     newChapters[chapterIndex].items.push({ title: '', type: 'video', videoFile: null })
// // //     setChapters(newChapters)
// // //   }

// // //   const removeChapter = (index: number) => {
// // //     setChapters(prev => prev.filter((_, i) => i !== index))
// // //   }

// // //   const removeItem = (chapterIdx: number, itemIdx: number) => {
// // //     const updated = [...chapters]
// // //     updated[chapterIdx].items = updated[chapterIdx].items.filter((_, i) => i !== itemIdx)
// // //     setChapters(updated)
// // //   }

// // //   const handleDragEnd = (event: any) => {
// // //     const { active, over } = event
// // //     if (active.id !== over.id) {
// // //       setChapters((items) => {
// // //         const oldIndex = active.id as number
// // //         const newIndex = over.id as number
// // //         return arrayMove(items, oldIndex, newIndex)
// // //       })
// // //     }
// // //   }

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     setLoading(true)

// // //     // Validation
// // //     if (!courseData.title || !courseData.slug || !courseData.originalPrice) {
// // //       alert('Please fill out course title, slug, and price.')
// // //       setLoading(false)
// // //       return
// // //     }
// // //     for (const [cIdx, chapter] of chapters.entries()) {
// // //       if (!chapter.title.trim()) {
// // //         alert(`Chapter ${cIdx + 1} needs a title.`)
// // //         setLoading(false)
// // //         return
// // //       }
// // //       for (const [iIdx, item] of chapter.items.entries()) {
// // //         if (!item.title.trim()) {
// // //           alert(`Item ${iIdx + 1} in Chapter ${cIdx + 1} needs a title.`)
// // //           setLoading(false)
// // //           return
// // //         }
// // //       }
// // //     }

// // //     const formData = new FormData()
// // //     Object.entries(courseData).forEach(([key, value]) => {
// // //       if (key === 'features') {
// // //         formData.append(key, JSON.stringify((value as string).split(',').map(f => f.trim())))
// // //       } else {
// // //         formData.append(key, String(value))
// // //       }
// // //     })

// // //     if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
// // //     if (logoFile) formData.append('logo', logoFile)

// // //     formData.append('chapters', JSON.stringify(
// // //       chapters.map((chapter, cIdx) => ({
// // //         ...chapter,
// // //         items: chapter.items.map((item, iIdx) => {
// // //           if (item.type === 'video' && item.videoFile) {
// // //             formData.append(`video_${cIdx}_${iIdx}`, item.videoFile as File)
// // //           }
// // //           return { ...item, videoFile: undefined }
// // //         })
// // //       }))
// // //     ))

// // //     try {
// // //       const res = await axios.post('/api/courses', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       })
// // //       alert('🎉 Course successfully created!')
// // //     } catch (err: any) {
// // //       console.error('Error:', err.response?.data || err.message)
// // //       alert('Error creating course. Check console.')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   return (
// // //     <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
// // //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// // //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// // //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// // //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// // //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// // //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// // //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// // //           <option value="beginner">Beginner</option>
// // //           <option value="intermediate">Intermediate</option>
// // //           <option value="advanced">Advanced</option>
// // //         </select>
// // //       </div>

// // //       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
// // //       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

// // //       <label className="flex items-center gap-2">
// // //         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
// // //         Certificate Included
// // //       </label>

// // //       <Input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} />
// // //       <p className="text-sm">Upload Course Thumbnail</p>

// // //       <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
// // //       <p className="text-sm">Upload Course Logo</p>

// // //       <Button type="button" onClick={() => setPreview(!preview)} variant="outline">
// // //         {preview ? 'Edit Mode' : 'Preview Course'}
// // //       </Button>

// // //       {preview && (
// // //         <div className="bg-gray-100 p-4 rounded">
// // //           <h3 className="text-xl font-bold">{courseData.title}</h3>
// // //           {chapters.map((ch, i) => (
// // //             <div key={i}>
// // //               <h4 className="font-semibold mt-4">{ch.title}</h4>
// // //               <ul className="list-disc list-inside">
// // //                 {ch.items.map((item, j) => (
// // //                   <li key={j}>{item.title} ({item.type})</li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       <h3 className="text-2xl font-semibold mt-6">Chapters</h3>

// // //       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// // //         <SortableContext items={chapters.map((_, index) => index)} strategy={verticalListSortingStrategy}>
// // //           {chapters.map((chapter, chapterIdx) => (
// // //             <SortableItem key={chapterIdx} id={chapterIdx}>
// // //               <div className="p-4 border rounded-xl bg-gray-100 space-y-4 mb-4">
// // //                 <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
// // //                 {chapter.items.map((item, itemIdx) => (
// // //                   <div key={itemIdx} className="pl-4 space-y-1">
// // //                     <Input placeholder="Item Title" value={item.title} onChange={(e) => updateItem(chapterIdx, itemIdx, 'title', e.target.value)} required />
// // //                     <select value={item.type} onChange={(e) => updateItem(chapterIdx, itemIdx, 'type', e.target.value)} className="border rounded px-2 py-1">
// // //                       <option value="video">Video</option>
// // //                       <option value="reading">Reading</option>
// // //                       <option value="assignment">Assignment</option>
// // //                     </select>
// // //                     {item.type === 'video' && (
// // //                       <input type="file" accept="video/*" onChange={(e) => updateItem(chapterIdx, itemIdx, 'videoFile', e.target.files?.[0] || null)} />
// // //                     )}
// // //                     {item.type !== 'video' && (
// // //                       <Textarea placeholder="Content" value={item.content || ''} onChange={(e) => updateItem(chapterIdx, itemIdx, 'content', e.target.value)} />
// // //                     )}
// // //                     <Input placeholder="Resources (comma separated)" value={item.resources || ''} onChange={(e) => updateItem(chapterIdx, itemIdx, 'resources', e.target.value)} />
// // //                     <Button type="button" onClick={() => removeItem(chapterIdx, itemIdx)} variant="destructive">Remove Item</Button>
// // //                   </div>
// // //                 ))}
// // //                 <Button type="button" onClick={() => addItem(chapterIdx)} variant="outline">+ Add Item</Button>
// // //                 <Button type="button" onClick={() => removeChapter(chapterIdx)} variant="destructive">Remove Chapter</Button>
// // //               </div>
// // //             </SortableItem>
// // //           ))}
// // //         </SortableContext>
// // //       </DndContext>

// // //       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>

// // //       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4" disabled={loading}>
// // //         {loading ? 'Creating Course...' : 'Create Course'}
// // //       </Button>
// // //     </form>
// // //   )
// // // }
// // 'use client'

// // import { useState, useEffect } from 'react'
// // import axios from 'axios'
// // import { Input } from '@/components/ui/input'
// // import { Button } from '@/components/ui/button'
// // import { Textarea } from '@/components/ui/textarea'
// // import { DndContext, closestCenter } from '@dnd-kit/core'
// // import {
// //   arrayMove,
// //   SortableContext,
// //   verticalListSortingStrategy,
// //   useSortable,
// // } from '@dnd-kit/sortable'
// // import { CSS } from '@dnd-kit/utilities'

// // interface ChapterInput {
// //   title: string
// // }

// // function SortableItem({ id, children }: { id: number; children: React.ReactNode }) {
// //   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //   }

// //   return (
// //     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
// //       {children}
// //     </div>
// //   )
// // }

// // export default function CourseBuilder() {
// //   const [chapters, setChapters] = useState<ChapterInput[]>([])
// //   const [courseData, setCourseData] = useState({
// //     title: '',
// //     slug: '',
// //     description: '',
// //     originalPrice: '',
// //     discountPercent: '',
// //     instructor: '',
// //     category: '',
// //     level: 'beginner',
// //     features: '',
// //     certificate: false,
// //   })
// //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
// //   const [logoFile, setLogoFile] = useState<File | null>(null)
// //   const [loading, setLoading] = useState(false)
// //   const [preview, setPreview] = useState(false)

// //   useEffect(() => {
// //     const savedCourse = localStorage.getItem('courseData')
// //     const savedChapters = localStorage.getItem('chapters')
// //     if (savedCourse) setCourseData(JSON.parse(savedCourse))
// //     if (savedChapters) setChapters(JSON.parse(savedChapters))
// //   }, [])

// //   useEffect(() => {
// //     localStorage.setItem('courseData', JSON.stringify(courseData))
// //     localStorage.setItem('chapters', JSON.stringify(chapters))
// //   }, [courseData, chapters])

// //   const updateCourseField = (field: string, value: any) => {
// //     setCourseData(prev => ({ ...prev, [field]: value }))
// //   }

// //   const updateChapter = (index: number, key: string, value: string) => {
// //     const newChapters = [...chapters]
// //     ;(newChapters[index] as any)[key] = value
// //     setChapters(newChapters)
// //   }

// //   const addChapter = () => {
// //     setChapters([...chapters, { title: '' }])
// //   }

// //   const removeChapter = (index: number) => {
// //     setChapters(prev => prev.filter((_, i) => i !== index))
// //   }

// //   const handleDragEnd = (event: any) => {
// //     const { active, over } = event
// //     if (active.id !== over.id) {
// //       setChapters((items) => {
// //         const oldIndex = active.id as number
// //         const newIndex = over.id as number
// //         return arrayMove(items, oldIndex, newIndex)
// //       })
// //     }
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setLoading(true)

// //     if (!courseData.title || !courseData.slug || !courseData.originalPrice) {
// //       alert('Please fill out course title, slug, and price.')
// //       setLoading(false)
// //       return
// //     }
// //     for (const [cIdx, chapter] of chapters.entries()) {
// //       if (!chapter.title.trim()) {
// //         alert(`Chapter ${cIdx + 1} needs a title.`)
// //         setLoading(false)
// //         return
// //       }
// //     }

// //     const formData = new FormData()
// //     Object.entries(courseData).forEach(([key, value]) => {
// //       if (key === 'features') {
// //         formData.append(key, JSON.stringify((value as string).split(',').map(f => f.trim())))
// //       } else {
// //         formData.append(key, String(value))
// //       }
// //     })

// //     if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
// //     if (logoFile) formData.append('logo', logoFile)

// //     formData.append('chapters', JSON.stringify(chapters))

// //     try {
// //       const res = await axios.post('/api/courses', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       })
// //       alert('🎉 Course successfully created!')
// //     } catch (err: any) {
// //       console.error('Error:', err.response?.data || err.message)
// //       alert('Error creating course. Check console.')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
// //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// //           <option value="beginner">Beginner</option>
// //           <option value="intermediate">Intermediate</option>
// //           <option value="advanced">Advanced</option>
// //         </select>
// //       </div>

// //       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
// //       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

// //       <label className="flex items-center gap-2">
// //         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
// //         Certificate Included
// //       </label>

// //       <Input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} />
// //       <p className="text-sm">Upload Course Thumbnail</p>

// //       <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
// //       <p className="text-sm">Upload Course Logo</p>

// //       <Button type="button" onClick={() => setPreview(!preview)} variant="outline">
// //         {preview ? 'Edit Mode' : 'Preview Course'}
// //       </Button>

// //       {preview && (
// //         <div className="bg-gray-100 p-4 rounded">
// //           <h3 className="text-xl font-bold">{courseData.title}</h3>
// //           <ul className="list-disc list-inside">
// //             {chapters.map((ch, i) => (
// //               <li key={i}>{ch.title}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       <h3 className="text-2xl font-semibold mt-6">Chapters</h3>

// //       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// //         <SortableContext items={chapters.map((_, index) => index)} strategy={verticalListSortingStrategy}>
// //           {chapters.map((chapter, chapterIdx) => (
// //             <SortableItem key={chapterIdx} id={chapterIdx}>
// //               <div className="p-4 border rounded-xl bg-gray-100 space-y-4 mb-4">
// //                 <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
// //                 <Button type="button" onClick={() => removeChapter(chapterIdx)} variant="destructive">Remove Chapter</Button>
// //               </div>
// //             </SortableItem>
// //           ))}
// //         </SortableContext>
// //       </DndContext>

// //       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>

// //       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4" disabled={loading}>
// //         {loading ? 'Creating Course...' : 'Create Course'}
// //       </Button>
// //     </form>
// //   )
// // }

// 'use client'

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { DndContext, closestCenter } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { v4 as uuidv4 } from 'uuid'

// interface ItemInput {
//   title: string
//   type: 'video' | 'reading' | 'assignment'
//   videoFile?: File | null
//   content?: string
//   resources?: string
// }

// interface ChapterInput {
//   id: string
//   title: string
//   items: ItemInput[]
// }

// function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   )
// }

// export default function CourseBuilder() {
//   const [chapters, setChapters] = useState<ChapterInput[]>([])
//   const [courseData, setCourseData] = useState({
//     title: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountPercent: '',
//     instructor: '',
//     category: '',
//     level: 'beginner',
//     features: '',
//     certificate: false,
//   })
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
//   const [logoFile, setLogoFile] = useState<File | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [preview, setPreview] = useState(false)

//   useEffect(() => {
//     const savedCourse = localStorage.getItem('courseData')
//     const savedChapters = localStorage.getItem('chapters')
//     if (savedCourse) setCourseData(JSON.parse(savedCourse))
//     if (savedChapters) setChapters(JSON.parse(savedChapters))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('courseData', JSON.stringify(courseData))
//     localStorage.setItem('chapters', JSON.stringify(chapters))
//   }, [courseData, chapters])

//   const updateCourseField = (field: string, value: any) => {
//     setCourseData(prev => ({ ...prev, [field]: value }))
//   }

//   const updateChapter = (index: number, key: string, value: string) => {
//     const newChapters = [...chapters]
//     ;(newChapters[index] as any)[key] = value
//     setChapters(newChapters)
//   }

//   const updateItem = (chapterIndex: number, itemIndex: number, key: string, value: any) => {
//     const newChapters = [...chapters]
//     ;(newChapters[chapterIndex].items[itemIndex] as any)[key] = value
//     setChapters(newChapters)
//   }

//   const addChapter = () => {
//     setChapters([...chapters, {
//       id: uuidv4(),
//       title: '',
//       items: [{ title: '', type: 'video', videoFile: null }]
//     }])
//   }

//   const addItem = (chapterIndex: number) => {
//     const newChapters = [...chapters]
//     newChapters[chapterIndex].items.push({ title: '', type: 'video', videoFile: null })
//     setChapters(newChapters)
//   }

//   const removeChapter = (index: number) => {
//     setChapters(prev => prev.filter((_, i) => i !== index))
//   }

//   const removeItem = (chapterIdx: number, itemIdx: number) => {
//     const updated = [...chapters]
//     updated[chapterIdx].items = updated[chapterIdx].items.filter((_, i) => i !== itemIdx)
//     setChapters(updated)
//   }

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event
//     if (active.id !== over.id) {
//       setChapters((items) => {
//         const oldIndex = items.findIndex(ch => ch.id === active.id)
//         const newIndex = items.findIndex(ch => ch.id === over.id)
//         return arrayMove(items, oldIndex, newIndex)
//       })
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     if (!courseData.title || !courseData.slug || !courseData.originalPrice) {
//       alert('Please fill out course title, slug, and price.')
//       setLoading(false)
//       return
//     }
//     for (const [cIdx, chapter] of chapters.entries()) {
//       if (!chapter.title.trim()) {
//         alert(`Chapter ${cIdx + 1} needs a title.`)
//         setLoading(false)
//         return
//       }
//       for (const [iIdx, item] of chapter.items.entries()) {
//         if (!item.title.trim()) {
//           alert(`Item ${iIdx + 1} in Chapter ${cIdx + 1} needs a title.`)
//           setLoading(false)
//           return
//         }
//       }
//     }

//     const formData = new FormData()
//     Object.entries(courseData).forEach(([key, value]) => {
//       if (key === 'features') {
//         formData.append(key, JSON.stringify((value as string).split(',').map(f => f.trim())))
//       } else {
//         formData.append(key, String(value))
//       }
//     })

//     if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
//     if (logoFile) formData.append('logo', logoFile)

//     formData.append('chapters', JSON.stringify(
//       chapters.map((chapter, cIdx) => ({
//         ...chapter,
//         items: chapter.items.map((item, iIdx) => {
//           if (item.type === 'video' && item.videoFile) {
//             formData.append(`video_${cIdx}_${iIdx}`, item.videoFile as File)
//           }
//           return { ...item, videoFile: undefined }
//         })
//       }))
//     ))

//     try {
//       const res = await axios.post('/api/courses', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       alert('🎉 Course successfully created!')
//     } catch (err: any) {
//       console.error('Error:', err.response?.data || err.message)
//       alert('Error creating course. Check console.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
//       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>
//       //       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
// //         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
// //         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
// //         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
// //         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
// //         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
// //         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
// //           <option value="beginner">Beginner</option>
// //           <option value="intermediate">Intermediate</option>
// //           <option value="advanced">Advanced</option>
//          </select>
// //       </div>

//        <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
//        <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

//        <label className="flex items-center gap-2">
//          <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
//          Certificate Included
//        </label>

//        <Input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} />
//       <p className="text-sm">Upload Course Thumbnail</p>
//       <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
//       <p className="text-sm">Upload Course Logo</p>

//       <Button type="button" onClick={() => setPreview(!preview)} variant="outline">
//        {preview ? 'Edit Mode' : 'Preview Course'}
//     </Button>

//       {preview && (
//         <div className="bg-gray-100 p-4 rounded">
//           <h3 className="text-xl font-bold">{courseData.title}</h3>
//           <ul className="list-disc list-inside">
//             {chapters.map((ch, i) => (
//               <li key={i}>{ch.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={chapters.map(ch => ch.id)} strategy={verticalListSortingStrategy}>
//           {chapters.map((chapter, chapterIdx) => (
//             <SortableItem key={chapter.id} id={chapter.id}>
//               <div className="p-4 border rounded-xl bg-gray-100 space-y-4 mb-4">
//                 <Input placeholder="Chapter Title" value={chapter.title} onChange={(e) => updateChapter(chapterIdx, 'title', e.target.value)} required />
//                 <Button type="button" onClick={() => removeChapter(chapterIdx)} variant="destructive">Remove Chapter</Button>
//               </div>
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>

//       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>

//       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4" disabled={loading}>
//         {loading ? 'Creating Course...' : 'Create Course'}
//       </Button>
//     </form>
//   )
// }
// 'use client'

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { DndContext, closestCenter } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { v4 as uuidv4 } from 'uuid'

// interface ItemInput {
//   title: string
//   type: 'video' | 'reading' | 'assignment'
//   videoFile?: File | null
//   content?: string
//   resources?: string
// }

// interface ChapterInput {
//   id: string
//   title: string
//   items: ItemInput[]
// }

// function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   )
// }

// export default function CourseBuilder() {
//   const [chapters, setChapters] = useState<ChapterInput[]>([])
//   const [courseData, setCourseData] = useState({
//     title: '',
//     slug: '',
//     description: '',
//     originalPrice: '',
//     discountPercent: '',
//     instructor: '',
//     category: '',
//     level: 'beginner',
//     features: '',
//     certificate: false,
//   })
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
//   const [logoFile, setLogoFile] = useState<File | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [preview, setPreview] = useState(false)

//   useEffect(() => {
//     const savedCourse = localStorage.getItem('courseData')
//     const savedChapters = localStorage.getItem('chapters')
//     if (savedCourse) setCourseData(JSON.parse(savedCourse))
//     if (savedChapters) setChapters(JSON.parse(savedChapters))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('courseData', JSON.stringify(courseData))
//     localStorage.setItem('chapters', JSON.stringify(chapters))
//   }, [courseData, chapters])

//   const updateCourseField = <K extends keyof typeof courseData>(field: K, value: typeof courseData[K]) => {
//     setCourseData(prev => ({ ...prev, [field]: value }))
//   }

//   // const updateChapter = (index: number, key: keyof Pick<ChapterInput, 'title'>, value: string) => {
//   //   const newChapters = [...chapters]
//   //   newChapters[index] = {
//   //     ...newChapters[index],
//   //     [key]: value,
//   //   }
//   //   setChapters(newChapters)
//   // }
//   const updateChapterTitle = (index: number, value: string) => {
//     setChapters(prev => {
//       const updated = [...prev]
//       updated[index] = {
//         ...updated[index],
//         title: value
//       }
//       return updated
//     })
//   }
  

//   const addChapter = () => {
//     setChapters([...chapters, {
//       id: uuidv4(),
//       title: '',
//       items: []
//     }])
//   }

//   const removeChapter = (index: number) => {
//     setChapters(prev => prev.filter((_, i) => i !== index))
//   }

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event
//     if (active.id !== over.id) {
//       setChapters((items) => {
//         const oldIndex = items.findIndex(ch => ch.id === active.id)
//         const newIndex = items.findIndex(ch => ch.id === over.id)
//         return arrayMove(items, oldIndex, newIndex)
//       })
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await axios.post('/api/courses', {
//         ...courseData,
//         chapters,
//       })
//       alert('🎉 Course successfully created!')
//     } catch (err: any) {
//       console.error('Error:', err.response?.data || err.message)
//       alert('Error creating course. Check console.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
//       <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Builder</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Input placeholder="Title" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
//         <Input placeholder="Slug (unique)" value={courseData.slug} onChange={(e) => updateCourseField('slug', e.target.value)} required />
//         <Input placeholder="Original Price" type="number" value={courseData.originalPrice} onChange={(e) => updateCourseField('originalPrice', e.target.value)} required />
//         <Input placeholder="Discount (%)" type="number" value={courseData.discountPercent} onChange={(e) => updateCourseField('discountPercent', e.target.value)} />
//         <Input placeholder="Category" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} />
//         <Input placeholder="Instructor ID" value={courseData.instructor} onChange={(e) => updateCourseField('instructor', e.target.value)} />
//         <select value={courseData.level} onChange={(e) => updateCourseField('level', e.target.value)} className="border rounded px-2 py-1">
//           <option value="beginner">Beginner</option>
//           <option value="intermediate">Intermediate</option>
//           <option value="advanced">Advanced</option>
//         </select>
//       </div>

//       <Textarea placeholder="Description" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} />
//       <Textarea placeholder="Comma-separated Features" value={courseData.features} onChange={(e) => updateCourseField('features', e.target.value)} />

//       <label className="flex items-center gap-2">
//         <input type="checkbox" checked={courseData.certificate} onChange={(e) => updateCourseField('certificate', e.target.checked)} />
//         Certificate Included
//       </label>

//       <Button type="button" onClick={() => setPreview(!preview)} variant="outline">
//         {preview ? 'Edit Mode' : 'Preview Course'}
//       </Button>

//       {preview && (
//         <div className="bg-gray-100 p-4 rounded">
//           <h3 className="text-xl font-bold">{courseData.title}</h3>
//           <ul className="list-disc list-inside">
//             {chapters.map((ch, i) => (
//               <li key={i}>{ch.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}

// {chapters.map((chapter, chapterIdx) => (
//   <div key={chapter.id} className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-800 space-y-4 mb-4">
//     <div className="flex flex-col gap-2">
//       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter {chapterIdx + 1} Title</label>
//       <Input
//         placeholder="Enter chapter title"
//         value={chapter.title}
//         onChange={(e) => updateChapterTitle(chapterIdx, e.target.value)}
//         required
//       />
//     </div>
//     <div className="text-right">
//       <Button type="button" onClick={() => removeChapter(chapterIdx)} variant="destructive" size="sm">
//         Remove Chapter
//       </Button>
//     </div>
//   </div>
// ))}

//       <Button type="button" onClick={addChapter} variant="default">+ Add Chapter</Button>

//       <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4" disabled={loading}>
//         {loading ? 'Creating Course...' : 'Create Course'}
//       </Button>
//     </form>
//   )
// }
'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { v4 as uuidv4 } from 'uuid'



function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default function CourseBuilder() {
  const [courseData, setCourseData] = useState({
    title: '',
    slug: '',
    description: '',
    originalPrice: '',
    discountPercent: '',
    instructor: '',
    category: '',
    duration:'',
    level: 'beginner',
    features: '',
    certificate: false,
  })
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)

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
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0])
    }
  }
  
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Build FormData to send multipart/form-data
      const formData = new FormData()
      formData.append('title', courseData.title)
      formData.append('slug', courseData.slug)
      formData.append('description', courseData.description)
      formData.append('originalPrice', courseData.originalPrice)
      formData.append('discountPercent', courseData.discountPercent)
      // formData.append('instructor', courseData.instructor)
      formData.append('instructor', courseData.instructor)
      formData.append('category', courseData.category)
      formData.append('level', courseData.level)
      formData.append('duration', courseData.duration)
      formData.append('certificate', courseData.certificate ? 'true' : 'false')
      // Save features as JSON string (or simply as comma-separated string)
      formData.append('features', courseData.features)
      // Append chapters as JSON string


      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile)
      }
      if (logoFile) {
        formData.append('logo', logoFile)
      }

      // Use axios to post FormData.
      const res = await axios.post('/api/create-course', formData)

      alert('🎉 Course successfully created!')
      courseData.title= '',
      courseData.slug= '',
      courseData.description='',
      courseData.originalPrice= '',
      courseData.discountPercent= '',
      courseData.instructor= '',
      courseData.category= '',
      courseData.duration='',
      courseData.level='beginner',
      courseData.features= '',
      courseData.certificate= false,
      setThumbnailFile(null),
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
        <Input placeholder="Instructor ID" value={courseData.instructor} onChange={e => updateCourseField('instructor', e.target.value)} />
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
