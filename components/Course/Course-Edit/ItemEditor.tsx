'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

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
  const [videoSourceType, setVideoSourceType] = useState<'url' | 'file' | ''>('')

  const handleAddItem = async () => {
    if (!newItemTitle.trim() || !newItemContent.trim()) {
      alert('Title and content are required')
      return
    }

    const formData = new FormData()
    formData.append('title', newItemTitle)
    formData.append('type', newItemType)
    formData.append('content', newItemContent)

    if (newItemType === 'video') {
      if (videoSourceType === 'url' && videoUrl) {
        formData.append('videoUrl', videoUrl)
      }
      if (videoSourceType === 'file' && file) {
        formData.append('file', file)
      }
    }

    if (newItemType === 'assignment' && file) {
      formData.append('file', file)
    }

    try {
     const subTopicId= subtopic._id;
      await axios.post(`/api/create-item/${subTopicId}` ,formData)
      setNewItemTitle('')
      setNewItemContent('')
      setVideoUrl('')
      setFile(null)
      setVideoSourceType('')
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
          <DialogContent className="space-y-4">
            <h3 className="text-lg font-semibold">Add New Item</h3>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newItemTitle}
                onChange={e => setNewItemTitle(e.target.value)}
                placeholder="Enter item title"
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <select
                value={newItemType}
                onChange={e => {
                  const type = e.target.value as 'video' | 'reading' | 'assignment'
                  setNewItemType(type)
                  setVideoSourceType('')
                  setVideoUrl('')
                  setFile(null)
                }}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="video">Video</option>
                <option value="reading">Reading</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={newItemContent}
                onChange={e => setNewItemContent(e.target.value)}
                placeholder="Enter item content"
              />
            </div>

            {/* VIDEO TYPE INPUTS */}
            {newItemType === 'video' && (
              <>
                <div className="space-y-2">
                  <Label>Video Source</Label>
                  <select
                    value={videoSourceType}
                    onChange={e => {
                      setVideoSourceType(e.target.value as 'url' | 'file')
                      setVideoUrl('')
                      setFile(null)
                    }}
                    className="w-full border px-3 py-2 rounded-md"
                  >
                    <option value="">Select source</option>
                    <option value="url">Video URL</option>
                    <option value="file">Upload File</option>
                  </select>
                </div>

                {videoSourceType === 'url' && (
                  <div className="space-y-2">
                    <Label>Video URL</Label>
                    <Input
                      type="url"
                      value={videoUrl}
                      onChange={e => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                )}

                {videoSourceType === 'file' && (
                  <div className="space-y-2">
                    <Label>Upload Video File</Label>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={e => {
                        if (e.target.files?.[0]) {
                          setFile(e.target.files[0])
                        }
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* ASSIGNMENT TYPE FILE UPLOAD */}
            {newItemType === 'assignment' && (
              <div className="space-y-2">
                <Label>Upload Assignment File</Label>
                <Input
                  type="file"
                  onChange={e => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0])
                    }
                  }}
                />
              </div>
            )}

            <div className="text-right">
              <Button onClick={handleAddItem}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {subtopic.items.length === 0 ? (
          <p className="text-gray-500 italic">No items added yet.</p>
        ) : (
          subtopic.items.map(item => (
            <div key={item._id} className="border rounded-xl p-4 bg-gray-50">
              <h4 className="font-medium text-lg">{item.title}</h4>
              <p className="text-sm text-gray-700 mt-1">{item.content}</p>
              {item.type === 'video' && item.videoUrl && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 block"
                >
                  Watch Video
                </a>
              )}
              {item.type === 'assignment' && item.videoUrl && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 block"
                >
                  Download Assignment
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ItemEditor
