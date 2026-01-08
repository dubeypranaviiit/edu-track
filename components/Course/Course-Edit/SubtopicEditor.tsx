'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react'
import ItemEditor from './ItemEditor'
import { updateSubtopic, deleteSubtopic } from '@/lib/api/subtopic'

interface Item {
  _id: string
  title: string
  type: 'video' | 'reading' | 'assignment'
  content: string
  uploadType?: 'upload' | 'url'
  videoUrl?: string
  resources?: string[]
}

interface Subtopic {
  _id: string
  title: string
  items: Item[]
}

interface Chapter {
  _id: string
  title: string
  subtopics: Subtopic[]
}

interface Props {
  chapter: Chapter
  onUpdate: () => void
}

const SubtopicEditor = ({ chapter, onUpdate }: Props) => {
  const [newSubtopicTitle, setNewSubtopicTitle] = useState('')
  const [openSubtopics, setOpenSubtopics] = useState<string[]>([])
  const [editSubtopicId, setEditSubtopicId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const toggleSubtopic = (id: string) => {
    setOpenSubtopics(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleAddSubtopic = async () => {
    if (!newSubtopicTitle.trim()) return alert('Subtopic title required')
    try {
      await axios.post('/api/create-subtopic', { chapterId: chapter._id, title: newSubtopicTitle })
      setNewSubtopicTitle('')
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to add subtopic')
    }
  }

  const handleEditSubtopic = async (subtopicId: string) => {
    if (!editTitle.trim()) return alert('Title required')
    try {
      await updateSubtopic(subtopicId, editTitle)
      setEditSubtopicId(null)
      setEditTitle('')
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to update subtopic')
    }
  }

  const handleDeleteSubtopic = async (subtopicId: string) => {
    if (!confirm('Are you sure you want to delete this subtopic?')) return
    try {
      await deleteSubtopic(subtopicId)
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to delete subtopic')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Subtopics for Chapter: {chapter.title}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add Subtopic</Button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-medium mb-2">Add New Subtopic</h3>
            <Label>Title</Label>
            <Input value={newSubtopicTitle} onChange={e => setNewSubtopicTitle(e.target.value)} />
            <div className="text-right mt-4">
              <Button onClick={handleAddSubtopic}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {chapter.subtopics.length === 0 && <p>No subtopics added yet.</p>}

        {chapter.subtopics.map(sub => (
          <div key={sub._id} className="border rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSubtopic(sub._id)}
              >
                <h4 className="font-medium text-lg">{sub.title}</h4>
                {openSubtopics.includes(sub._id) ? <ChevronDown /> : <ChevronRight />}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => { setEditSubtopicId(sub._id); setEditTitle(sub.title) }}>
                  <Edit size={16} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteSubtopic(sub._id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            {editSubtopicId === sub._id && (
              <div className="mt-2 flex gap-2 items-center">
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <Button size="sm" onClick={() => handleEditSubtopic(sub._id)}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditSubtopicId(null)}>Cancel</Button>
              </div>
            )}

            {openSubtopics.includes(sub._id) && (
              <div className="mt-4">
                <ItemEditor subtopic={sub} onUpdate={onUpdate} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubtopicEditor
