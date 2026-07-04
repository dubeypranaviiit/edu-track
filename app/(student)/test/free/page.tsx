'use client';
import React, { useEffect, useState } from "react";
import { useAllQuizzesStore } from "@/store/useAllQuizzesStore";
import { FiClock } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { IoTrophyOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const AllTestsPage = () => {
  const router = useRouter();
  const { quizzes, loading, fetchQuizzes } = useAllQuizzesStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading tests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Tests</h1>

      <input
        type="text"
        placeholder="Search tests..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border rounded-md px-4 py-2 mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-20 px-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <BsQuestionCircle className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">No Tests Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto text-sm">
            We couldn't find any tests matching your search query. Try searching for different terms.
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {filteredQuizzes.map((q) => (
          <div key={q._id} className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold">{q.title}</h2>
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                Published
              </span>
            </div>
            <p className="text-gray-600 mb-3">{q.description}</p>
            <div className="flex gap-4 text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                <BsQuestionCircle /> {q.totalQuestions} Qs
              </div>
              <div className="flex items-center gap-2">
                <FiClock /> {q.duration} min
              </div>
              <div className="flex items-center gap-2">
                <IoTrophyOutline /> {q.totalMarks} Marks
              </div>
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => router.push(`/test/${q.slug}`)}
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTestsPage;
