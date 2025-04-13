"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// Define course structure
interface Course {
  _id: string;
  name: string;
  code: string;
  description?: string;
  teacherName?: string;
}

export const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <aside className="w-72 bg-white h-screen p-4 border-r overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">All Courses</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <Link key={course._id} href={`/dashboard/course/${course._id}`}>
            <div className="p-4 border rounded-xl hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
              <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
              <p className="text-sm text-gray-500">Code: {course.code}</p>
              {course.teacherName && (
                <p className="text-xs text-gray-400 mt-1">By {course.teacherName}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};
