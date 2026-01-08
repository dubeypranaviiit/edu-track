"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Home/Loader";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { useFetchCourseStore } from "@/store/useFetchCourseStore";
import { useUserStore } from "@/store/useUserStore";

const EnrolledCourse: React.FC = () => {
  const { profile } = useUserStore();
  const userId = profile?._id; 
  const enrolledCourses = useFetchCourseStore(state => state.enrolledCourses);
  const loadingEnrolled = useFetchCourseStore(state => state.loadingEnrolled);
  const errorEnrolled = useFetchCourseStore(state => state.errorEnrolled);
  const fetchEnrolledCourses = useFetchCourseStore(state => state.fetchEnrolledCourses);
  const [filterType, setFilterType] = useState<"all" | "free" | "premium">("all");
  const [sortBy, setSortBy] = useState<"default" | "priceLow" | "priceHigh" | "shortest" | "newest">("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasCertificateOnly, setHasCertificateOnly] = useState(false);

  useEffect(() => {
    if (userId) fetchEnrolledCourses(userId);
  }, [userId, fetchEnrolledCourses]);
  const parseDuration = (str: string): number => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };
 const mappedCourses = (enrolledCourses || []).map(course => ({
  ...course,
  instructor: course.instructor?.name || "Unknown Instructor",
  subtitle: course.category || "General",
  logo: course.logo || "/logo.png",
  thumbnail: course.thumbnail || "/course-placeholder.jpg",
  lessons: course.chapters?.length || 0,
  finalPrice: course.finalPrice ?? course.originalPrice,
  certificate: course.certificate ?? false,
}));
  const filteredCourses = mappedCourses.filter(course => {
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
    return 0;
  });

  return (
    <main className="grow py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Your Enrolled Courses
      </h1>
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
      {loadingEnrolled ? (
        <Loader />
      ) : errorEnrolled ? (
        <p className="text-red-500 text-center py-10">Failed to load courses: {errorEnrolled}</p>
      ) : sortedCourses.length === 0 ? (
        <p className="text-center py-10">No enrolled courses found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedCourses.map((course, index) => (
            <EnrolledCourseCard key={index} {...course} />
          ))}
        </div>
      )}
    </main>
  );
};

export default EnrolledCourse;
