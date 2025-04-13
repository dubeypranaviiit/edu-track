// "use client";

// import { useState } from "react";
// import CourseCard, { CourseCardProps } from "@/components/Course/CourseCard";
// import { dummyCourses } from "@/lib/data";

// const CourseDashboard = () => {
//   const [filterType, setFilterType] = useState<"all" | "free" | "premium">("all");
//   const [sortBy, setSortBy] = useState<"default" | "priceLow" | "priceHigh" | "shortest" | "newest">("default");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [hasCertificateOnly, setHasCertificateOnly] = useState(false);

//   const parseDuration = (str: string): number => {
//     const match = str.match(/(\d+)/);
//     return match ? parseInt(match[1]) : 0;
//   };

//   const filteredCourses = dummyCourses.filter((course) => {
//     const matchesType =
//       filterType === "free"
//         ? course.price === 0
//         : filterType === "premium"
//         ? course.price > 0
//         : true;

//     const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesCertificate = hasCertificateOnly ? course.certificate === true : true;

//     return matchesType && matchesSearch && matchesCertificate;
//   });

//   const sortedCourses = [...filteredCourses].sort((a, b) => {
//     if (sortBy === "priceLow") return a.price - b.price;
//     if (sortBy === "priceHigh") return b.price - a.price;
//     if (sortBy === "shortest") return parseDuration(a.duration) - parseDuration(b.duration);
//     if (sortBy === "newest") {
//       const dateA = new Date(a.dateAdded || "2024-01-01").getTime();
//       const dateB = new Date(b.dateAdded || "2024-01-01").getTime();
//       return dateB - dateA;
//     }
//     return 0;
//   });

//   return (
//     <main className="flex-grow py-10 px-6">
//       <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
//         Explore Our Courses
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by title or instructor..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border p-2 rounded-md w-full sm:w-64"
//         />

//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value as any)}
//           className="border p-2 rounded-md"
//         >
//           <option value="all">All Courses</option>
//           <option value="free">Free Courses</option>
//           <option value="premium">Premium Courses</option>
//         </select>

//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value as any)}
//           className="border p-2 rounded-md"
//         >
//           <option value="default">Sort by</option>
//           <option value="priceLow">Price: Low to High</option>
//           <option value="priceHigh">Price: High to Low</option>
//           <option value="shortest">Shortest Duration</option>
//           <option value="newest">Newest</option>
//         </select>

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={hasCertificateOnly}
//             onChange={(e) => setHasCertificateOnly(e.target.checked)}
//           />
//           Certificate Only
//         </label>
//       </div>

//       {/* Course Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {sortedCourses.map((course, index) => (
//           <CourseCard key={index} {...course} />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default CourseDashboard;
"use client";

import { useState, useEffect } from "react";
import CourseCard, { CourseCardProps } from "@/components/Course/CourseCard";
import axios from "axios";

const CourseDashboard = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [filterType, setFilterType] = useState<"all" | "free" | "premium">("all");
  const [sortBy, setSortBy] = useState<"default" | "priceLow" | "priceHigh" | "shortest" | "newest">("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasCertificateOnly, setHasCertificateOnly] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/courses");
        const mappedCourses: CourseCardProps[] = data.map((course: any) => ({
          imageUrl: course.thumbnail,
          logoUrl: "/logo.png", // Replace with actual logo if available
          title: course.title,
          subtitle: course.category,
          instructor: course.instructor?.name || "Unknown Instructor",
          originalPrice: course.originalPrice,
          discountPercent: course.discountPercent,
          finalPrice: course.finalPrice,
          duration: course.duration || "5h 30m", // Adjust as needed
          lessons: course.chapters?.length || 0,
          certificate: course.certificate,
        }));
        setCourses(mappedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const parseDuration = (str: string): number => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const filteredCourses = courses.filter((course) => {
    const matchesType =
      filterType === "free"
        ? course.finalPrice === 0
        : filterType === "premium"
        ? course.finalPrice > 0
        : true;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCertificate = hasCertificateOnly ? course.certificate === true : true;

    return matchesType && matchesSearch && matchesCertificate;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "priceLow") return a.finalPrice - b.finalPrice;
    if (sortBy === "priceHigh") return b.finalPrice - a.finalPrice;
    if (sortBy === "shortest") return parseDuration(a.duration) - parseDuration(b.duration);
    if (sortBy === "newest") return 0; // Modify if you fetch dateAdded
    return 0;
  });

  return (
    <main className="flex-grow py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Explore Our Courses
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by title or instructor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-64"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border p-2 rounded-md"
        >
          <option value="all">All Courses</option>
          <option value="free">Free Courses</option>
          <option value="premium">Premium Courses</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="border p-2 rounded-md"
        >
          <option value="default">Sort by</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="shortest">Shortest Duration</option>
          <option value="newest">Newest</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hasCertificateOnly}
            onChange={(e) => setHasCertificateOnly(e.target.checked)}
          />
          Certificate Only
        </label>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </main>
  );
};

export default CourseDashboard;

