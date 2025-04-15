// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from '@/lib/axios';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import {UploadButton} from "@/components/upload/UploadButton" // Optional Cloudinary wrapper

// interface Item {
//   title: string;
//   type: 'video' | 'reading' | 'assignment';
//   uploadType?: 'upload' | 'url';
//   videoUrl?: string;
//   content?: string;
//   resources?: string[];
// }

// interface Subtopic {
//   title: string;
//   items: Item[];
// }

// interface Chapter {
//   title: string;
//   subtopics: Subtopic[];
// }

// interface CourseMeta {
//   title: string;
//   slug: string;
//   description: string;
//   originalPrice: number;
//   discountPercent: number;
//   level: string;
//   category: string;
//   certificate: boolean;
//   features: string[];
//   duration: number;
//   chapters: Chapter[];
// }
// const dummyCourse: CourseMeta = {
//     title: 'Introduction to Web Development',
//     slug: 'intro-to-web-dev',
//     description: 'Learn the basics of HTML, CSS, and JavaScript in this beginner-friendly course.',
//     originalPrice: 199,
//     discountPercent: 40,
//     level: 'beginner',
//     category: 'web-development',
//     certificate: true,
//     features: ['Interactive lessons', 'Certificate of completion', 'Downloadable resources'],
//     duration: 180,
//     chapters: [
//       {
//         title: 'Getting Started',
//         subtopics: [
//           {
//             title: 'Course Overview',
//             items: [
//               {
//                 title: 'Welcome Video',
//                 type: 'video',
//                 uploadType: 'url',
//                 videoUrl: 'https://www.example.com/welcome-video',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: 'HTML Basics',
//         subtopics: [
//           {
//             title: 'HTML Structure',
//             items: [
//               {
//                 title: 'HTML Introduction Video',
//                 type: 'video',
//                 uploadType: 'url',
//                 videoUrl: 'https://www.example.com/html-intro',
//               },
//               {
//                 title: 'HTML Tags Reading',
//                 type: 'reading',
//                 content: 'HTML consists of tags like <p>, <h1>, <a>, etc. that structure web content.',
//               },
//               {
//                 title: 'HTML Assignment',
//                 type: 'assignment',
//                 resources: ['https://www.example.com/html-assignment.pdf'],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };
  
// export default function CourseEditPage() {
//   const { slug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [course, setCourse] = useState<CourseMeta | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!slug) return;
// //       try {
// //         const res = await axios.get(`/course/${slug}`);
// //         setCourse(res.data.course);
// //       } catch (error) {
// //         console.error('Error fetching course:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [slug]);
// useEffect(() => {
//     setCourse(dummyCourse);
//     setLoading(false);
//   }, []);
  

//   const handleMetaChange = (field: keyof CourseMeta, value: any) => {
//     setCourse((prev) => prev ? { ...prev, [field]: value } : prev);
//   };

//   const handleChapterChange = (index: number, value: string) => {
//     const updated = [...(course?.chapters || [])];
//     updated[index].title = value;
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const addChapter = () => {
//     setCourse((prev) => prev ? {
//       ...prev,
//       chapters: [...prev.chapters, { title: '', subtopics: [] }]
//     } : prev);
//   };

//   const removeChapter = (chapterIndex: number) => {
//     setCourse((prev) => prev ? {
//       ...prev,
//       chapters: prev.chapters.filter((_, i) => i !== chapterIndex)
//     } : prev);
//   };

//   const addSubtopic = (chapterIndex: number) => {
//     const updated = [...(course?.chapters || [])];
//     updated[chapterIndex].subtopics.push({ title: '', items: [] });
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const handleSubtopicChange = (cIdx: number, sIdx: number, value: string) => {
//     const updated = [...(course?.chapters || [])];
//     updated[cIdx].subtopics[sIdx].title = value;
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const removeSubtopic = (cIdx: number, sIdx: number) => {
//     const updated = [...(course?.chapters || [])];
//     updated[cIdx].subtopics.splice(sIdx, 1);
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const addItem = (cIdx: number, sIdx: number) => {
//     const updated = [...(course?.chapters || [])];
//     updated[cIdx].subtopics[sIdx].items.push({
//       title: '',
//       type: 'video',
//       uploadType: 'url',
//       videoUrl: '',
//     });
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const handleItemChange = (cIdx: number, sIdx: number, iIdx: number, field: keyof Item, value: any) => {
//     const updated = [...(course?.chapters || [])];
//     updated[cIdx].subtopics[sIdx].items[iIdx][field] = value;
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const removeItem = (cIdx: number, sIdx: number, iIdx: number) => {
//     const updated = [...(course?.chapters || [])];
//     updated[cIdx].subtopics[sIdx].items.splice(iIdx, 1);
//     setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`/course/${slug}`, course);
//       alert(' Course updated successfully!');
//     } catch (err) {
//       console.error('Error saving course:', err);
//       alert(' Failed to update course');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!course) return <p>No course found.</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Edit Course</h1>

//       <Card className="p-4 space-y-4">
//         <h2 className="text-xl font-semibold">Course Metadata</h2>
//         <Input placeholder="Course Title" value={course.title} onChange={(e) => handleMetaChange('title', e.target.value)} />
//         <Input placeholder="Slug" value={course.slug} onChange={(e) => handleMetaChange('slug', e.target.value)} />
//         <Textarea placeholder="Description" value={course.description} onChange={(e) => handleMetaChange('description', e.target.value)} />
//         <Input type="number" placeholder="Original Price" value={course.originalPrice} onChange={(e) => handleMetaChange('originalPrice', +e.target.value)} />
//         <Input type="number" placeholder="Discount (%)" value={course.discountPercent} onChange={(e) => handleMetaChange('discountPercent', +e.target.value)} />
//         <Input type="number" placeholder="Duration (mins)" value={course.duration} onChange={(e) => handleMetaChange('duration', +e.target.value)} />
//         <Select value={course.level} onValueChange={(val) => handleMetaChange('level', val)}>
//           <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="beginner">Beginner</SelectItem>
//             <SelectItem value="intermediate">Intermediate</SelectItem>
//             <SelectItem value="advanced">Advanced</SelectItem>
//           </SelectContent>
//         </Select>
//       </Card>

//       {course.chapters.map((chapter, cIdx) => (
//         <Card key={cIdx} className="p-4 space-y-4">
//           <div className="flex justify-between items-center">
//             <Input placeholder={`Chapter ${cIdx + 1} Title`} value={chapter.title} onChange={(e) => handleChapterChange(cIdx, e.target.value)} />
//             <Button variant="destructive" size="sm" onClick={() => removeChapter(cIdx)}>Remove Chapter</Button>
//           </div>

//           {chapter.subtopics.map((subtopic, sIdx) => (
//             <div key={sIdx} className="ml-4 p-4 rounded bg-gray-100 dark:bg-gray-800 space-y-2">
//               <div className="flex justify-between items-center">
//                 <Input placeholder={`Subtopic ${sIdx + 1}`} value={subtopic.title} onChange={(e) => handleSubtopicChange(cIdx, sIdx, e.target.value)} />
//                 <Button variant="destructive" size="sm" onClick={() => removeSubtopic(cIdx, sIdx)}>Remove Subtopic</Button>
//               </div>

//               {subtopic.items.map((item, iIdx) => (
//                 <div key={iIdx} className="ml-4 space-y-2 border-l-2 pl-4">
//                   <Input placeholder="Item Title" value={item.title} onChange={(e) => handleItemChange(cIdx, sIdx, iIdx, 'title', e.target.value)} />

//                   <Select value={item.type} onValueChange={(val) => handleItemChange(cIdx, sIdx, iIdx, 'type', val)}>
//                     <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="video">Video</SelectItem>
//                       <SelectItem value="reading">Reading</SelectItem>
//                       <SelectItem value="assignment">Assignment</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   {item.type === 'video' && (
//                     <div className="space-y-2">
//                       <Select
//                         value={item.uploadType || 'url'}
//                         onValueChange={(val) => handleItemChange(cIdx, sIdx, iIdx, 'uploadType', val)}
//                       >
//                         <SelectTrigger><SelectValue placeholder="Choose upload method" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="url">Provide Video URL</SelectItem>
//                           <SelectItem value="upload">Upload Video</SelectItem>
//                         </SelectContent>
//                       </Select>

//                       {(item.uploadType === 'url' || !item.uploadType) && (
//                         <Input placeholder="Video URL" value={item.videoUrl} onChange={(e) => handleItemChange(cIdx, sIdx, iIdx, 'videoUrl', e.target.value)} />
//                       )}

//                       {/* {item.uploadType === 'upload' && (
//                         <UploadButton onUpload={(url) => handleItemChange(cIdx, sIdx, iIdx, 'videoUrl', url)} />
//                       )} */}
//                     </div>
//                   )}

//                   {item.type === 'reading' && (
//                     <Textarea placeholder="Reading Content" value={item.content} onChange={(e) => handleItemChange(cIdx, sIdx, iIdx, 'content', e.target.value)} />
//                   )}

//                   {/* {item.type === 'assignment' && (
//                     <UploadButton onUpload={(url) => handleItemChange(cIdx, sIdx, iIdx, 'resources', [url])} />
//                   )} */}

//                   <Button variant="destructive" size="sm" onClick={() => removeItem(cIdx, sIdx, iIdx)}>Remove Item</Button>
//                 </div>
//               ))}

//               <Button onClick={() => addItem(cIdx, sIdx)} size="sm">+ Add Item</Button>
//             </div>
//           ))}

//           <Button onClick={() => addSubtopic(cIdx)}>+ Add Subtopic</Button>
//         </Card>
//       ))}

//       <Button onClick={addChapter} className="bg-purple-600 text-white">+ Add Chapter</Button>
//       <Button onClick={handleSave} className="bg-green-600 text-white">Save Course</Button>
//     </div>
//   );
// }
// Updated CourseEditPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Item {
  title: string;
  type: 'video' | 'reading' | 'assignment';
  uploadType?: 'upload' | 'url';
  videoUrl?: string;
  content?: string;
  resources?: string[];
}

interface Subtopic {
  title: string;
  items: Item[];
}

interface Chapter {
  title: string;
  subtopics: Subtopic[];
}

interface CourseMeta {
  title: string;
  slug: string;
  description: string;
  originalPrice: number;
  discountPercent: number;
  level: string;
  category: string;
  certificate: boolean;
  features: string[];
  duration: number;
  chapters: Chapter[];
}

export default function CourseEditPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseMeta | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const res = await axios.get(`/create-course/${slug}`);
        console.log(res.data.course);
        setCourse(res.data.course._doc);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleMetaChange = (field: keyof CourseMeta, value: any) => {
    setCourse((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleChapterChange = (index: number, value: string) => {
    const updated = [...(course?.chapters || [])];
    updated[index].title = value;
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const addChapter = () => {
    setCourse((prev) => prev ? {
      ...prev,
      chapters: [...prev.chapters, { title: '', subtopics: [] }]
    } : prev);
  };

  const removeChapter = (chapterIndex: number) => {
    setCourse((prev) => prev ? {
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== chapterIndex)
    } : prev);
  };

  const addSubtopic = (chapterIndex: number) => {
    const updated = [...(course?.chapters || [])];
    updated[chapterIndex].subtopics.push({ title: '', items: [] });
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const handleSubtopicChange = (cIdx: number, sIdx: number, value: string) => {
    const updated = [...(course?.chapters || [])];
    updated[cIdx].subtopics[sIdx].title = value;
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const removeSubtopic = (cIdx: number, sIdx: number) => {
    const updated = [...(course?.chapters || [])];
    updated[cIdx].subtopics.splice(sIdx, 1);
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const addItem = (cIdx: number, sIdx: number) => {
    const updated = [...(course?.chapters || [])];
    updated[cIdx].subtopics[sIdx].items.push({
      title: '',
      type: 'video',
      uploadType: 'url',
      videoUrl: '',
    });
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const handleItemChange = (cIdx: number, sIdx: number, iIdx: number, field: keyof Item, value: any) => {
    const updated = [...(course?.chapters || [])];
    updated[cIdx].subtopics[sIdx].items[iIdx][field] = value;
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const removeItem = (cIdx: number, sIdx: number, iIdx: number) => {
    const updated = [...(course?.chapters || [])];
    updated[cIdx].subtopics[sIdx].items.splice(iIdx, 1);
    setCourse((prev) => prev ? { ...prev, chapters: updated } : prev);
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('/upload', formData);
    return res.data.url;
  };

  const handleMetaSave = async () => {
    try {
      const meta = { ...course };
      delete meta.chapters;
      await axios.put(`/course/${slug}/meta`, meta);
      alert('Metadata saved!');
    } catch (error) {
      alert('Failed to save metadata');
    }
  };

  const handleContentSave = async () => {
    try {
      await axios.put(`/course/${slug}/content`, { chapters: course?.chapters });
      alert('Content saved!');
    } catch (error) {
      alert('Failed to save content');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Course</h1>

      <Card className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Course Metadata</h2>
        <Input placeholder="Title" value={course.title} onChange={(e) => handleMetaChange('title', e.target.value)} />
        <Input placeholder="Slug" value={course.slug} onChange={(e) => handleMetaChange('slug', e.target.value)} />
        <Textarea placeholder="Description" value={course.description} onChange={(e) => handleMetaChange('description', e.target.value)} />
        <Input type="number" placeholder="Price" value={course.originalPrice} onChange={(e) => handleMetaChange('originalPrice', +e.target.value)} />
        <Input type="number" placeholder="Discount %" value={course.discountPercent} onChange={(e) => handleMetaChange('discountPercent', +e.target.value)} />
        <Input type="string" placeholder="Duration " value={course.duration} onChange={(e) => handleMetaChange('duration', e.target.value)} />
        <Select value={course.level} onValueChange={(val) => handleMetaChange('level', val)}>
          <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleMetaSave} className="bg-blue-600 text-white">Save Metadata</Button>
      </Card>

      {course?.chapters?.map((chapter, cIdx) => (
        <Card key={cIdx} className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Input placeholder={`Chapter ${cIdx + 1}`} value={chapter.title} onChange={(e) => handleChapterChange(cIdx, e.target.value)} />
            <Button variant="destructive" size="sm" onClick={() => removeChapter(cIdx)}>Remove</Button>
          </div>

          {chapter.subtopics.map((sub, sIdx) => (
            <div key={sIdx} className="ml-4 p-4 rounded bg-gray-100 dark:bg-gray-800 space-y-2">
              <div className="flex justify-between items-center">
                <Input value={sub.title} onChange={(e) => handleSubtopicChange(cIdx, sIdx, e.target.value)} />
                <Button variant="destructive" size="sm" onClick={() => removeSubtopic(cIdx, sIdx)}>Remove Subtopic</Button>
              </div>

              {sub.items.map((item, iIdx) => (
                <div key={iIdx} className="ml-4 border-l-2 pl-4 space-y-2">
                  <Input value={item.title} onChange={(e) => handleItemChange(cIdx, sIdx, iIdx, 'title', e.target.value)} />
                  <Select value={item.type} onValueChange={(val) => handleItemChange(cIdx, sIdx, iIdx, 'type', val)}>
                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="reading">Reading</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>

                  {item.type === 'video' && (
                    <>
                      <Select value={item.uploadType || 'url'} onValueChange={(val) => handleItemChange(cIdx, sIdx, iIdx, 'uploadType', val)}>
                        <SelectTrigger><SelectValue placeholder="Upload method" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="url">URL</SelectItem>
                          <SelectItem value="upload">Upload</SelectItem>
                        </SelectContent>
                      </Select>

                      {item.uploadType === 'url' ? (
                        <Input placeholder="Video URL" value={item.videoUrl} onChange={(e) => handleItemChange(cIdx, sIdx, iIdx, 'videoUrl', e.target.value)} />
                      ) : (
                        <Input type="file" accept="video/*" onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await handleFileUpload(e.target.files[0]);
                            handleItemChange(cIdx, sIdx, iIdx, 'videoUrl', url);
                          }
                        }} />
                      )}
                    </>
                  )}

                  {item.type === 'reading' && (
                    <Textarea value={item.content} onChange={(e) => handleItemChange(cIdx, sIdx, iIdx, 'content', e.target.value)} />
                  )}

                  {item.type === 'assignment' && (
                    <Input type="file" accept=".pdf,.docx" onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        const url = await handleFileUpload(e.target.files[0]);
                        handleItemChange(cIdx, sIdx, iIdx, 'resources', [url]);
                      }
                    }} />
                  )}

                  <Button variant="destructive" size="sm" onClick={() => removeItem(cIdx, sIdx, iIdx)}>Remove Item</Button>
                </div>
              ))}
              <Button onClick={() => addItem(cIdx, sIdx)} size="sm">+ Add Item</Button>
            </div>
          ))}
          <Button onClick={() => addSubtopic(cIdx)} size="sm">+ Add Subtopic</Button>
        </Card>
      ))}

      <div className="flex flex-col gap-4">
        <Button onClick={addChapter} className="bg-purple-600 text-white">+ Add Chapter</Button>
        <Button onClick={handleContentSave} className="bg-green-600 text-white">Save Content</Button>
      </div>
    </div>
  );
}