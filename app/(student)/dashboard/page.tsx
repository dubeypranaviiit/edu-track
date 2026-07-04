"use client";
import { FiHome, FiClipboard, FiBook, FiAward, FiFileText, FiUser } from "react-icons/fi";
import React, { useState } from "react";
import Sidebar from "@/components/instructor/Sidebar";
import Assignments from "@/components/instructor/sections/Assignments";
import Submissions from "@/components/instructor/sections/Submissions";
import CourseDashboard from "@/components/course/CourseDashboard";
import StudentProfile from "@/components/student/StudentProfile";
import EnrolledCourse from "@/components/course/enrolled/EnrolledCourse";
import ResultsPage from "@/app/(student)/results/page";

const navItems = [
  { id: "courses", icon: FiHome, label: "Courses" },
  { id: "enrolled", icon: FiBook, label: "Enrolled" },
  { id: "results", icon: FiAward, label: "My Results" },
  { id: "article", icon: FiFileText, label: "Articles" },
  { id: "assignment", icon: FiClipboard, label: "Assignment" },
  { id: "profile", icon: FiUser, label: "Profile" },
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
          {/* <Header role={"Student"} /> */}
          <main className="p-4 overflow-auto flex-1">
            {activeSection === "courses" && <CourseDashboard />}
            {activeSection === "enrolled" && <EnrolledCourse />}
            {activeSection === "results" && <ResultsPage />}
            {activeSection === "assignment" && <Assignments />}
            {activeSection === "submissions" && <Submissions />}
            {/* {activeSection === "grading" && <Grading />} */}
            {activeSection === "profile" && <StudentProfile />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
