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
  uploadType?: 'upload' | 'url'
  videoUrl?: string
  resources?: string[]
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

  const [editItemId, setEditItemId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editVideoUrl, setEditVideoUrl] = useState('')
  const [editFile, setEditFile] = useState<File | null>(null)
  const [editUploadType, setEditUploadType] = useState<'upload' | 'url' | ''>('')
  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return alert('Title is required')

    const formData = new FormData()
    formData.append('title', newItemTitle)
    formData.append('type', newItemType)
    formData.append('content', newItemContent)

    if (newItemType === 'video') {
      if (videoSourceType === 'url' && videoUrl) {
        formData.append('videoUrl', videoUrl)
        formData.append('uploadType', 'url')
      }
      if (videoSourceType === 'file' && file) {
        formData.append('file', file)
        formData.append('uploadType', 'upload')
      }
    }

    if (newItemType === 'assignment' && file) {
      formData.append('file', file)
      formData.append('uploadType', 'upload')
    }

    try {
      await axios.post(`/api/create-item/${subtopic._id}`, formData)
      setNewItemTitle(''); setNewItemContent(''); setVideoUrl(''); setFile(null); setVideoSourceType('')
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to add item')
    }
  }
  const handleEditItem = async (itemId: string) => {
    const formData = new FormData()
    formData.append('title', editTitle)
    formData.append('content', editContent)

    if (editItemId) {
      const item = subtopic.items.find(i => i._id === editItemId)
      if (item?.type === 'video') {
        if (editUploadType === 'url' && editVideoUrl) formData.append('videoUrl', editVideoUrl)
        if (editUploadType === 'upload' && editFile) formData.append('file', editFile)
        if (editUploadType) formData.append('uploadType', editUploadType)
      }
      if (item?.type === 'assignment' && editFile) {
        formData.append('file', editFile)
        formData.append('uploadType', 'upload')
      }
    }

    try {
      await axios.put(`/api/update-item/${itemId}`, formData)
      setEditItemId(null)
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to update item')
    }
  }
  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await axios.delete(`/api/delete-item/${itemId}`)
      onUpdate()
    } catch (err) {
      console.error(err)
      alert('Failed to delete item')
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
            <Label>Title</Label>
            <Input value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} />

            <Label>Type</Label>
            <select value={newItemType} onChange={e => { setNewItemType(e.target.value as any); setVideoSourceType(''); setVideoUrl(''); setFile(null) }}
              className="w-full border px-3 py-2 rounded-md">
              <option value="video">Video</option>
              <option value="reading">Reading</option>
              <option value="assignment">Assignment</option>
            </select>

            <Label>Content</Label>
            <Textarea value={newItemContent} onChange={e => setNewItemContent(e.target.value)} />

            {newItemType === 'video' && (
              <>
                <Label>Video Source</Label>
                <select value={videoSourceType} onChange={e => setVideoSourceType(e.target.value as 'url' | 'file')} className="w-full border px-3 py-2 rounded-md">
                  <option value="">Select source</option>
                  <option value="url">URL</option>
                  <option value="file">Upload</option>
                </select>
                {videoSourceType === 'url' && <Input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://..." />}
                {videoSourceType === 'file' && <Input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />}
              </>
            )}

            {newItemType === 'assignment' && <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />}

            <div className="text-right mt-4">
              <Button onClick={handleAddItem}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {subtopic.items.length === 0 ? <p className="text-gray-500 italic">No items added yet.</p> :
          subtopic.items.map(item => (
            <div key={item._id} className="border rounded-xl p-4 bg-gray-50">
              {editItemId === item._id ? (
                <div className="space-y-2">
                  <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                  <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
                  {item.type === 'video' && (
                    <>
                      <select value={editUploadType} onChange={e => setEditUploadType(e.target.value as 'url' | 'upload')}>
                        <option value="">Select source</option>
                        <option value="url">URL</option>
                        <option value="upload">Upload</option>
                      </select>
                      {editUploadType === 'url' && <Input type="url" value={editVideoUrl} onChange={e => setEditVideoUrl(e.target.value)} />}
                      {editUploadType === 'upload' && <Input type="file" onChange={e => setEditFile(e.target.files?.[0] || null)} />}
                    </>
                  )}
                  {item.type === 'assignment' && <Input type="file" onChange={e => setEditFile(e.target.files?.[0] || null)} />}
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => handleEditItem(item._id)}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditItemId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="font-medium text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">{item.content}</p>
                  {item.type === 'video' && item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm mt-2 block">Watch Video</a>}
                  {item.type === 'assignment' && item.resources?.length && item.resources.map((res, idx) => (
                    <a key={idx} href={res} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm mt-2 block">Download Assignment</a>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditItemId(item._id); setEditTitle(item.title); setEditContent(item.content) }}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default ItemEditor
