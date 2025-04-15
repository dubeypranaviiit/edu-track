'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
// import { FileUpload } from '@/components/ui/file-upload'

interface Item {
  _id: string
  title: string
  type: 'video' | 'reading' | 'assignment'
  content: string
  videoUrl?: string
}

interface Subtopic {
  _id: string
  title: string
  items: Item[]
}

interface Props {
  subtopic: Subtopic
  onUpdate: () => void
}

const ItemEditor = ({ subtopic, onUpdate }: Props) => {
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemType, setNewItemType] = useState<'video' | 'reading' | 'assignment'>('video')
  const [newItemContent, setNewItemContent] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleAddItem = async () => {
    if (!newItemTitle.trim() || !newItemContent.trim()) return alert('Title and content are required')

    const formData = new FormData()
    formData.append('title', newItemTitle)
    formData.append('type', newItemType)
    formData.append('content', newItemContent)
    if (newItemType === 'video' && videoUrl) formData.append('videoUrl', videoUrl)
    if (file) formData.append('file', file)

    try {
      await axios.post(`/api/subtopic/${subtopic._id}`, formData)
      setNewItemTitle('')
      setNewItemContent('')
      setVideoUrl('')
      setFile(null)
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to add item')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Items for Subtopic: {subtopic.title}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-medium mb-2">Add New Item</h3>
            <Label>Title</Label>
            <Input
              value={newItemTitle}
              onChange={e => setNewItemTitle(e.target.value)}
              placeholder="Enter item title"
            />
            <div className="mt-4">
              <Label>Type</Label>
              <select
                value={newItemType}
                onChange={e => setNewItemType(e.target.value as 'video' | 'reading' | 'assignment')}
                className="w-full"
              >
                <option value="video">Video</option>
                <option value="reading">Reading</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div className="mt-4">
              <Label>Content</Label>
              <Textarea
                value={newItemContent}
                onChange={e => setNewItemContent(e.target.value)}
                placeholder="Enter item content"
              />
            </div>
            {newItemType === 'video' && (
              <div className="mt-4">
                <Label>Video URL</Label>
                <Input
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL (if applicable)"
                />
              </div>
            )}
        {newItemType === 'assignment' && (
  <div className="mt-4">
    <input
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0])
        }
      }}
      className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
    />
  </div>
)}
            <div className="text-right mt-4">
              <Button onClick={handleAddItem}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {subtopic.items.length === 0 && <p>No items added yet.</p>}

      <div className="space-y-2">
        {subtopic.items.map(item => (
          <div key={item._id} className="border rounded-xl p-4 bg-gray-50">
            <h4 className="font-medium text-lg">{item.title}</h4>
            <p>{item.content}</p>
            {item.type === 'video' && <p>Video URL: {item.videoUrl}</p>}
            {item.type === 'assignment' && <p>Assignment File: {item.videoUrl}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemEditor
