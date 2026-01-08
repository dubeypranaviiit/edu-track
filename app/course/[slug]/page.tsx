"use client";
import { useCourseDetail } from "@/lib/hooks/useCourseDetail";
import { useState } from "react";

import CourseDetail from "@/components/Course/CourseDetail";
import { useParams } from "next/navigation";
import Loader from "@/components/Home/Loader";
interface Params {
  params: {
    slug: string;
  };
}

export default function CoursePage({ params }: Params) {
 
  const [loading, setLoading] = useState<boolean>(true);
  const { slug } = useParams()
  const { data, error, isLoading } = useCourseDetail(slug as string)

  if (isLoading) return <Loader />

  const course = data?.course?._doc


  if (error || !course) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-gray-900">
        <h1 className="text-3xl font-bold">{error || "Course not found"}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
     
      <main className="flex-1">
        <CourseDetail course={course} />
      </main>

    </div>
  );
}
