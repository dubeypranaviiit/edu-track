'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FiEdit2,
  FiTrash2,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { IoTrophyOutline } from "react-icons/io5";

type Test = {
  title: string;
  description: string;
  questions: number;
  duration: number;
  TotalQuestion:number;
  totalMarks: number;
  isPublished: boolean;
  slug: string;
};

const TestManagementDashboard = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Unpublished">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        console.log(`Fetching is allowed or not`);
        // const res = await axios.get("/test-create"); 
        const res = await axios.get('/api/test-create');
        console.log(res);
        if(res.data.quizzes.isPublished){
          console.log(`published hai`);
        }
        setTests(res.data.quizzes);
      } catch (err) {
        console.error("Failed to fetch tests:", err);
      } finally {
        console.log(`Nhi ho paa raha fetch`);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleTogglePublish = async (slug: string) => {
    const test = tests.find((t) => t.slug === slug);
    if (!test) return;

    try {
      const updated = await axios.patch(`/api/test-create/${slug}`, {
        isPublished: !test.isPublished,
      });

      setTests((prev) =>
        prev.map((t) =>
          t.slug === slug ? { ...t, isPublished: updated.data.isPublished } : t
        )
      );
    } catch (err) {
      console.error("Failed to toggle publish:", err);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await axios.delete(`/api/test-create/${slug}`);
      setTests((prev) => prev.filter((t) => t.slug !== slug));
    } catch (err) {
      console.error("Failed to delete test:", err);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/test/${slug}`);
  };

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" ? test.isPublished : !test.isPublished);
    return matchesSearch && matchesStatus;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  if (loading) return <p className="text-center">Loading tests...</p>;

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

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedTests.map((test) => (
          <div
            key={test.slug}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold text-gray-800">{test.title}</h2>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  test.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {test.isPublished ? "Published" : "Unpublished"}
              </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{test.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-gray-700">
              <div className="flex items-center gap-2">
                <BsQuestionCircle className="text-blue-500" />
                <span>{test.TotalQuestion} Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-blue-500" />
                <span>{test.duration} Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTrophyOutline className="text-blue-500" />
                <span>{test.totalMarks} Marks</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleEdit(test.slug)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <FiEdit2 className="mr-2" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(test.slug)}
                className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>

              <button
                onClick={() => handleTogglePublish(test.slug)}
                className={`flex items-center px-4 py-2 text-sm text-white rounded-md ${
                  test.isPublished
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                <FiCheckCircle className="mr-2" />
                {test.isPublished ? "Unpublish" : "Publish"}
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
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

export default TestManagementDashboard;
