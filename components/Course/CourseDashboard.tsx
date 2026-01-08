"use client";
import React, { useEffect, useState } from "react";
import CourseCard, { CourseCardProps } from "@/components/Course/CourseCard";
import { useFetchCourseStore } from "@/store/useFetchCourseStore";

const CourseDashboard: React.FC = () => {
  // Fetch state from store
  const courses = useFetchCourseStore((state) => state.courses);
   const loadingCourses = useFetchCourseStore((state) => state.loadingCourses);
  const errorCourses = useFetchCourseStore((state) => state.errorCourses);
  const fetchCourses = useFetchCourseStore((state) => state.fetchCourses);
  const [filterType, setFilterType] = useState<"all" | "free" | "premium">("all");
  const [sortBy, setSortBy] = useState<"default" | "priceLow" | "priceHigh" | "shortest" | "newest">(
    "default"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hasCertificateOnly, setHasCertificateOnly] = useState(false);


  useEffect(() => {
    if (courses.length === 0) fetchCourses();
  }, [fetchCourses, courses.length]);


  const parseDuration = (str: string): number => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const mappedCourses: CourseCardProps[] = courses.map((course) => ({
    imageUrl: course.thumbnail,
    logoUrl: "/logo.png",
    title: course.title,
    subtitle: course.category,
    instructor: course.instructor?.name || "Unknown Instructor",
    originalPrice: course.originalPrice,
    discountPercent: course.discountPercent,
    finalPrice: course.finalPrice,
    duration: course.duration || "5h 30m",
    lessons: course.chapters?.length || 0,
    certificate: course.certificate,
    thumbnail: course.thumbnail,
    slug: course.slug,
  }));

  
  const filteredCourses = mappedCourses.filter((course) => {
    const matchesType =
      filterType === "free"
        ? course.finalPrice === 0
        : filterType === "premium"
        ? course.finalPrice! > 0
        : true;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCertificate = hasCertificateOnly ? course.certificate === true : true;

    return matchesType && matchesSearch && matchesCertificate;
  });

 
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "priceLow") return a.finalPrice! - b.finalPrice!;
    if (sortBy === "priceHigh") return b.finalPrice! - a.finalPrice!;
    if (sortBy === "shortest") return parseDuration(a.duration) - parseDuration(b.duration);
    if (sortBy === "newest") return 0; // Replace with createdAt if available
    return 0;
  });

 
  if (loadingCourses) return <p className="text-center py-10">Loading courses...</p>;
  if (errorCourses)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load courses: {errorCourses}
      </p>
    );
  if (courses.length === 0) return <p className="text-center py-10">No courses available</p>;

  return (
    <main className="grow py-10 px-6">
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

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </main>
  );
};

export default CourseDashboard;
