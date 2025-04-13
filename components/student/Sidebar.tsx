"use client";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { FaCheckCircle, FaFileAlt, FaQuestionCircle, FaVideo } from "react-icons/fa";
import { Course } from "@/types/course";

type Props = {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ course, isOpen, onClose }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(course.currentLesson); // ✅ add state

  const sidebarWidth = isExpanded ? "w-64" : "w-20";

  return (
    <aside
      className={`
        h-full fixed lg:static top-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-md
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarWidth}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        {isExpanded && <h2 className="text-lg font-semibold">Contents</h2>}
        <button onClick={onClose} className="lg:hidden p-2">
          <FiX />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {isExpanded && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-semibold">{course.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {course.chapters.map((chapter) => (
            <div key={chapter.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                {chapter.type === "video" && <FaVideo />}
                {chapter.type === "assignment" && <FaFileAlt />}
                {chapter.type === "quiz" && <FaQuestionCircle />}
                {isExpanded && <span className="font-medium">{chapter.title}</span>}
                {chapter.completed && <FaCheckCircle className="text-green-500 ml-auto" />}
              </div>

              {isExpanded && (
                <div className="ml-6 space-y-1">
                  {chapter.subtopics.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setCurrentLesson(sub.id)} // ✅ handle click
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                        currentLesson === sub.id
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-sm">{sub.title}</span>
                      {sub.completed && <FaCheckCircle className="text-green-500 ml-auto" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
