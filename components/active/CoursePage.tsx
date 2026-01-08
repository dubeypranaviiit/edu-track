"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import CoursePlayer from "@/components/active/CoursePlayer";
import CourseHeader from "@/components/active/CourseHeader";
import { Course, Item } from "@/types/course";

interface Props {
  course: Course;
}

export default function CoursePage({ course }: Props) {
  const firstItem =
    course?.chapters?.[0]?.subtopics?.[0]?.items?.[0] ?? null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(firstItem);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
     
      <Sidebar
        chapters={course.chapters}
        selectedItem={selectedItem}
        onItemSelect={setSelectedItem}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="flex-1 flex flex-col">
        <CourseHeader
          title={course.title}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {selectedItem ? (
          <CoursePlayer item={selectedItem} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No content available.
          </div>
        )}
      </main>
    </div>
  );
}
