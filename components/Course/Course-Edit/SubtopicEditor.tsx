'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight } from 'lucide-react'
import ItemEditor from './ItemEditor'

interface Subtopic {
  _id: string
  title: string
  items: Item[]
}

interface Item {
  _id: string
  title: string
  type: 'video' | 'reading' | 'assignment'
}

interface Props {
  chapter: { _id: string; title: string; subtopics: Subtopic[] }
  onUpdate: () => void
}

const SubtopicEditor = ({ chapter, onUpdate }: Props) => {
  const [newSubtopicTitle, setNewSubtopicTitle] = useState('')
  const [openSubtopics, setOpenSubtopics] = useState<string[]>([])

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
            <Input
              value={newSubtopicTitle}
              onChange={e => setNewSubtopicTitle(e.target.value)}
            />
            <div className="text-right mt-4">
              <Button onClick={handleAddSubtopic}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {chapter.subtopics.length === 0 && <p>No subtopics added yet.</p>}

      <div className="space-y-2">
        {chapter.subtopics.map(sub => (
          <div key={sub._id} className="border rounded-xl p-4 bg-gray-50">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSubtopic(sub._id)}
            >
              <h4 className="font-medium text-lg">{sub.title}</h4>
              {openSubtopics.includes(sub._id) ? <ChevronDown /> : <ChevronRight />}
            </div>

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
