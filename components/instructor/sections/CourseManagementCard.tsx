'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi2';

type Course = {
  title: string;
  slug: string;
  description: string;
  originalPrice: number;
  discountPercent: number;
  instructor: string;
  isPublished: boolean;
  totalEnrollment: number;
};

const CourseManagementDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Published' | 'Unpublished'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/create-course');
        console.log(res.data);
        setCourses(res.data.courses);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleTogglePublish = async (slug: string) => {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return;

    try {
      const updated = await axios.patch(`/api/create-course/${slug}`, {
        isPublished: !course.isPublished,
      });

      setCourses((prev) =>
        prev.map((c) =>
          c.slug === slug ? { ...c, isPublished: updated.data.isPublished } : c
        )
      );
    } catch (err) {
      console.error('Failed to toggle publish:', err);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await axios.delete(`/api/create-course/${slug}`);
      setCourses((prev) => prev.filter((c) => c.slug !== slug));
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/create-course/${slug}`);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Published' ? course.isPublished : !course.isPublished);
    return matchesSearch && matchesStatus;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  if (loading) return <p className="text-center">Loading courses...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-3 py-2 rounded-md w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
        >
          <option value="All">All</option>
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.slug}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {course.isPublished ? 'Published' : 'Unpublished'}
              </span>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-medium text-blue-600">₹{course.originalPrice}</span>
                <span className="text-sm text-gray-500">({course.discountPercent}% off)</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineSchool className="text-blue-500" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineUsers className="text-blue-500" />
                <span>{course.totalEnrollment} Enrolled</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleEdit(course.slug)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <FiEdit2 className="mr-2" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(course.slug)}
                className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>

              <button
                onClick={() => handleTogglePublish(course.slug)}
                className={`flex items-center px-4 py-2 text-sm text-white rounded-md ${
                  course.isPublished
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                <FiCheckCircle className="mr-2" />
                {course.isPublished ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseManagementDashboard;
