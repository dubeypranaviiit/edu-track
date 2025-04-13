"use client";
import React, { useState } from "react";
import axios from "axios";

interface Submission {
  id: number;
  name: string;
  course: string;
  date: string;
  status: "Submitted" | "Graded" | "Rejected";
  grade?: number;
  feedback?: string;
  fileUrl?: string;
  fileType?: string;
}

const initialSubmissions: Submission[] = [
  {
    id: 1,
    name: "John Doe",
    course: "Math 101",
    date: "2024-01-10",
    status: "Submitted",
    fileUrl: "/sample1.pdf",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: "Physics 202",
    date: "2024-01-11",
    status: "Graded",
    grade: 8,
    feedback: "Well done!",
    fileUrl: "/sample2.png",
    fileType: "image",
  },
  {
    id: 3,
    name: "Alan Walker",
    course: "Math 101",
    date: "2024-01-13",
    status: "Rejected",
    feedback: "Plagiarized content.",
    fileUrl: "",
    fileType: "",
  },
];

const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filters, setFilters] = useState({
    course: "All",
    status: "All",
    sortByDate: "desc",
  });

  const handleGradeChange = (id: number, value: number) => {
    if (value < 0 || value > 10) return;
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, grade: value } : s))
    );
  };

  const handleFeedbackChange = (id: number, value: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, feedback: value } : s))
    );
  };

  const handleSaveToDB = async (id: number, updatedData: Partial<Submission>) => {
    try {
      await axios.put(`/api/submissions/${id}`, updatedData);
      console.log("Saved to DB:", updatedData);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleGrade = (id: number) => {
    const submission = submissions.find((s) => s.id === id);
    if (!submission || submission.grade === undefined) return;

    const updated = { ...submission, status: "Graded" as const };
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? updated : s))
    );

    handleSaveToDB(id, {
      status: "Graded",
      grade: submission.grade,
      feedback: submission.feedback || "",
    });
  };

  const handleReject = (id: number) => {
    const submission = submissions.find((s) => s.id === id);
    if (!submission) return;

    const updated = { ...submission, status: "Rejected" as const };
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? updated : s))
    );

    handleSaveToDB(id, {
      status: "Rejected",
      feedback: submission.feedback || "",
    });
  };

  const filteredSubmissions = submissions
    .filter((s) =>
      (filters.course === "All" || s.course === filters.course) &&
      (filters.status === "All" || s.status === filters.status)
    )
    .sort((a, b) =>
      filters.sortByDate === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Submissions</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filters.course}
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="All">All Courses</option>
          {[...new Set(submissions.map((s) => s.course))].map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="All">All Status</option>
          <option value="Submitted">Submitted</option>
          <option value="Graded">Graded</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={filters.sortByDate}
          onChange={(e) => setFilters({ ...filters, sortByDate: e.target.value })}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">
            <th className="p-2">Student</th>
            <th className="p-2">Course</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Grade (0-10)</th>
            <th className="p-2">Feedback</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((s) => (
            <tr
              key={s.id}
              onClick={() => setSelectedSubmission(s)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.course}</td>
              <td className="p-2">{s.date}</td>
              <td className="p-2">{s.status}</td>
              <td className="p-2">
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={s.grade ?? ""}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleGradeChange(s.id, Number(e.target.value))
                  }
                  className="w-16 p-1 rounded border"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={s.feedback ?? ""}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleFeedbackChange(s.id, e.target.value)}
                  className="w-40 p-1 rounded border"
                />
              </td>
              <td className="p-2">
                {s.status !== "Rejected" && (
                  <>
                    <button
                      className="text-white bg-green-600 hover:bg-green-700 font-semibold px-3 py-1 rounded-md mr-2 transition-transform transform hover:scale-105 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrade(s.id);
                      }}
                    >
                      Grade
                    </button>
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 font-semibold px-3 py-1 rounded-md transition-transform transform hover:scale-105 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(s.id);
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Preview Section */}
      {selectedSubmission && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Preview - {selectedSubmission.name}'s Submission
            </h3>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="text-sm text-red-500 hover:underline"
            >
              Close
            </button>
          </div>

          {selectedSubmission.fileType === "image" && selectedSubmission.fileUrl && (
            <img
              src={selectedSubmission.fileUrl}
              alt="Submission Preview"
              className="rounded-md max-w-md object-cover"
            />
          )}

          {selectedSubmission.fileType === "pdf" && selectedSubmission.fileUrl && (
            <iframe
              src={selectedSubmission.fileUrl}
              width="100%"
              height="400px"
              className="rounded-md"
              title="PDF Preview"
            />
          )}

          {!selectedSubmission.fileUrl && (
            <p className="text-gray-600 dark:text-gray-300">No preview available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Submissions;
