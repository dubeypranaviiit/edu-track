"use client";
import React, { useState } from "react";
import Sidebar from "@/components/instructor/Sidebar";
import Header from "@/components/instructor/Header";
import Courses from "@/components/instructor/sections/Courses";
import Assignments from "@/components/instructor/sections/Assignments";
import Submissions from "@/components/instructor/sections/Submissions";
import QuestionsForm from "@/components/examCreate/QuestionsForm";
// import Grading from "@/components/instructor/sections/Grading";
import { FaBook, FaClipboardList,FaBookOpen, FaInbox, FaGraduationCap,FaRegClipboard, FaListUl, } from "react-icons/fa";
import CourseBuilder from "@/components/instructor/sections/CourseBuilder";
import TestManagementDashboard from "@/components/examCreate/TestManagementDashboard";
import CourseManagementDashboard from "@/components/instructor/sections/CourseManagementCard";
const navItems = [
  { id: "courses", icon: FaBook, label: "Create Course" },
  { id: "all-courses", icon: FaBookOpen, label: "All Courses" },
  { id: "create-test", icon: FaRegClipboard, label: "Create Test" },
  { id: "all-tests", icon: FaListUl, label: "All Tests" }, // ✅ Added
  { id: "assignments", icon: FaClipboardList, label: "Assignments" },
  { id: "submissions", icon: FaInbox, label: "Submissions" },
];
const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("courses");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          active={activeSection}
          setActive={setActiveSection}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          navItems={navItems}
        />
        <div className="flex-1 h-screen flex flex-col">
          {/* <Header role={"Instructor"} /> */}
          <main className="p-4 overflow-auto flex-1">
            {activeSection === "courses" && <CourseBuilder/>}
            {activeSection === "create-test" && <QuestionsForm/>}
            {activeSection === "assignments" && <Assignments />}
            {activeSection === "submissions" && <Submissions />}
            {activeSection === "all-tests" && <TestManagementDashboard/>}
            {activeSection === "all-courses" && <CourseManagementDashboard/>}
            {/* {activeSection === "grading" && <Grading />} */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
