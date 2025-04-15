'use client'

import React, { useState } from 'react'
import axios from 'axios'
// import { ChapterType } from '@/types/course'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight } from 'lucide-react'
import SubtopicEditor from './SubtopicEditor'

interface Props {
  courseId: string
  chapters:  Chapter[]
  onUpdate: () => void
}

const ChapterSection = ({ courseId, chapters, onUpdate }: Props) => {
  const [newTitle, setNewTitle] = useState('')
  const [openChapters, setOpenChapters] = useState<string[]>([])

  const toggleChapter = (id: string) => {
    setOpenChapters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleAddChapter = async () => {
    if (!newTitle.trim()) return alert('Chapter title required')
    try {
      await axios.post(`/api/create-chapter`, { courseId, title: newTitle })
      setNewTitle('')
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to add chapter')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chapters</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add Chapter</Button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-medium mb-2">Add New Chapter</h3>
            <Label>Title</Label>
            <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <div className="text-right mt-4">
              <Button onClick={handleAddChapter}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* {chapters.length === 0 && <p>No chapters added yet.</p>} */}

      <div className="space-y-2">
        {chapters.map(ch => (
          <div key={ch._id} className="border rounded-xl p-4 bg-gray-50">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleChapter(ch._id)}
            >
              <h3 className="font-medium text-lg">{ch.title}</h3>
              {openChapters.includes(ch._id) ? <ChevronDown /> : <ChevronRight />}
            </div>

            {openChapters.includes(ch._id) && (
              <div className="mt-4">
                <SubtopicEditor chapter={ch} onUpdate={onUpdate} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterSection
