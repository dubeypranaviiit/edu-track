'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react'
import SubtopicEditor from './SubtopicEditor'
import { updateChapter, deleteChapter } from '@/lib/api/chapter'

interface Chapter {
  _id: string
  title: string
  subtopics: string[]
  course: string
}

interface Props {
  courseId: string
  chapters: Chapter[]
  onUpdate: () => void
}

const ChapterSection = ({ courseId, chapters, onUpdate }: Props) => {
  const [newTitle, setNewTitle] = useState('')
  const [editChapterId, setEditChapterId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [openChapters, setOpenChapters] = useState<string[]>([])

  const toggleChapter = (id: string) => {
    setOpenChapters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleAddChapter = async () => {
    if (!newTitle.trim()) return alert('Chapter title required')
    try {
      await axios.post('/api/create-chapter', { courseId, title: newTitle })
      setNewTitle('')
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to add chapter')
    }
  }

  const handleEditChapter = async (chapterId: string) => {
    if (!editTitle.trim()) return alert('Title required')
    try {
      await updateChapter(chapterId, editTitle)
      setEditChapterId(null)
      setEditTitle('')
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to update chapter')
    }
  }

  const handleDeleteChapter = async (chapterId: string) => {
    if (!confirm('Are you sure you want to delete this chapter?')) return
    try {
      await deleteChapter(chapterId)
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to delete chapter')
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
      <div className="space-y-2">
        {chapters.map(ch => (
          <div key={ch._id} className="border rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleChapter(ch._id)}
              >
                <h3 className="font-medium text-lg">{ch.title}</h3>
                {openChapters.includes(ch._id) ? <ChevronDown /> : <ChevronRight />}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => { setEditChapterId(ch._id); setEditTitle(ch.title) }}>
                  <Edit size={16} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteChapter(ch._id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            {editChapterId === ch._id && (
              <div className="mt-2 flex gap-2 items-center">
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <Button size="sm" onClick={() => handleEditChapter(ch._id)}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditChapterId(null)}>Cancel</Button>
              </div>
            )}

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
