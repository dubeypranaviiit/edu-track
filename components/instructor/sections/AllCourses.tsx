import { useEffect } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import useInstructorId from "@/lib/hooks/useInstructorId";
import Link from "next/link";

export const AllCourses = () => {
  const instructorId = useInstructorId();
  const { courses, fetchCourses, loadingCourses } = useCourseStore();

  useEffect(() => {
    if (!instructorId) return;
    fetchCourses(instructorId);
  }, [instructorId]);

  if (loadingCourses) return <p>Loading courses...</p>;

  return (
    <aside className="w-72 bg-white h-screen p-4 border-r overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">All Courses</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <Link key={course._id} href={`/dashboard/course/${course._id}`}>
            <div className="p-4 border rounded-xl hover:shadow-md hover:bg-gray-50 transition cursor-pointer">
              <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-500">Category: {course.category}</p>
              <p className="text-xs text-gray-400 mt-1">Level: {course.level}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};
