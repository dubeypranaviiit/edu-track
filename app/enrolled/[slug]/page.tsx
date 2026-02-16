"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import CourseHeader from "@/components/active/CourseHeader";
import CoursePlayer from "@/components/active/CoursePlayer";
import CourseContentSidebar from "@/components/active/CourseContentSidebar";
import { useActiveCourseStore } from "@/store/useActiveCourseStore";
type Props = {
  title: string;
  onMenuClick?: () => void; 
};
export default function CoursePage() {
  const { slug } = useParams();

  const {
    course,
    selectedItem,
    loading,
    fetchCourseBySlug,
    setSelectedItem,
  } = useActiveCourseStore();

  useEffect(() => {
    if (slug) fetchCourseBySlug(slug as string);
  }, [slug]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;
  if (!course)
    return <div className="mt-20 text-center text-red-500">Course not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CourseHeader title={course.title} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-black">
          <CoursePlayer item={selectedItem} />
        </div>

        <aside className="w-[380px] border-l bg-white overflow-y-auto">
          <CourseContentSidebar
            chapters={course.chapters}
            selectedItemId={selectedItem?._id}
            onItemSelect={setSelectedItem}
          />
        </aside>
      </div>
    </div>
  );
}
