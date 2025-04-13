"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';

export interface Subtopic {
  id: string;
  title: string;
  videoUrl: string;
}

export interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

 const CoursePage = ({ course }: { course: Course }) => {
  const allSubtopics = course.topics.flatMap((t) => t.subtopics);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic>(allSubtopics[0]);
  const [completedSubtopics, setCompletedSubtopics] = useState<string[]>([]);

  const handleSubtopicSelect = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    if (!completedSubtopics.includes(subtopic.id)) {
      setCompletedSubtopics((prev) => [...prev, subtopic.id]);
    }
  };

  const completedPercent = Math.round((completedSubtopics.length / allSubtopics.length) * 100);

  return (
    <div className="flex h-screen">
      <Sidebar
        topics={course.topics}
        selectedSubtopic={selectedSubtopic}
        setSelectedSubtopic={handleSubtopicSelect}
        completedPercent={completedPercent}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

        <VideoPlayer subtopic={selectedSubtopic} />
      </main>
    </div>
  );
};
export default CoursePage;