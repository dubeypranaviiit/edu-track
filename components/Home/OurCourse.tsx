"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import CourseCard from "../Course/CourseCard";
import Loader from "./Loader";
import { useFetchCourseStore } from "@/store/useFetchCourseStore";

const OurCourse: React.FC = () => {
const courses = useFetchCourseStore((state) => state.courses);
const loadingCourses = useFetchCourseStore((state) => state.loadingCourses);
const errorCourses = useFetchCourseStore((state) => state.errorCourses);
const fetchCourses = useFetchCourseStore((state) => state.fetchCourses);

  // Fetch courses once on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loadingCourses) return <Loader />;
  if (errorCourses)
    return <div className="text-red-500">Failed to load course data: {errorCourses}</div>;

  const displayedCourses = courses.slice(0, 12);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))
          ) : (
            <div>No courses available</div>
          )}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/course"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Explore More Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurCourse;
