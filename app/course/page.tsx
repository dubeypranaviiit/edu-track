// app/courses/page.tsx
// import CourseCard, { CourseCardProps } from "@/components/Course/CourseCard";
// import Header from "@/components/Home/Header";
// import Footer from "@/components/Home/Footer"; // make sure this path is correct
// import { dummyCourses } from "@/lib/data";

// const page = () => {
//   const courses: CourseCardProps[] = dummyCourses;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
//       <Header />

//       <main className="flex-grow py-10 px-6">
//         <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
//           Explore Our Courses
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {courses.map((course, index) => (
//             <CourseCard key={index} {...course} />
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default page;
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard, { CourseCardProps } from "@/components/Course/CourseCard";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // API endpoint for courses data
        console.log(response);
        if(response.data.courses){
          console.log(`Array`);
        }
        setCourses(response.data.courses);
      } catch (err) {
        setError("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-grow py-10 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Explore Our Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
    courses.map((course, index) => (
      <CourseCard key={index} {...course} />
    ))
  ) : (
    <div>No courses available</div>
  )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
