'use client';
import React, { useEffect, useState } from "react";
import { useQuizManagementStore } from "@/store/useQuizManagementStore";
import { FiEdit2, FiTrash2, FiClock, FiCheckCircle } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { IoTrophyOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const TestManagementDashboard = () => {
  const router = useRouter();
  const { quizzes, loading, fetchQuizzes, deleteQuiz, togglePublish } = useQuizManagementStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Unpublished">("All");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const filtered = quizzes.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus === "All" || (filterStatus === "Published" ? t.isPublished : !t.isPublished))
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search"
          className="border px-3 py-2 rounded-md"
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

      {loading ? (
        <p className="text-center">Loading tests...</p>
      ) : (
        <div className="grid gap-6">
          {filtered.map((t) => (
            <div key={t._id} className="p-6 border rounded-xl bg-white shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold">{t.title}</h2>
                <span className={`px-3 py-1 text-sm rounded-full ${t.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {t.isPublished ? "Published" : "Unpublished"}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{t.description}</p>
              <div className="flex gap-4 text-gray-700 mb-4">
                <div className="flex items-center gap-2"><BsQuestionCircle />{t.totalQuestions} Qs</div>
                <div className="flex items-center gap-2"><FiClock />{t.duration} min</div>
                <div className="flex items-center gap-2"><IoTrophyOutline />{t.totalMarks} Marks</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => router.push(`/edit-test/${t.slug}`)} className="px-4 py-2 border rounded-md"><FiEdit2 /> Edit</button>
                <button onClick={() => deleteQuiz(t.slug)} className="px-4 py-2 bg-red-600 text-white rounded-md"><FiTrash2 /> Delete</button>
                <button onClick={() => togglePublish(t.slug)} className={`px-4 py-2 rounded-md text-white ${t.isPublished ? "bg-blue-600" : "bg-yellow-500"}`}>
                  <FiCheckCircle /> {t.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestManagementDashboard;
