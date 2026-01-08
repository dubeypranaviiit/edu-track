"use client";
import { FiHome, FiClipboard , FiBook, FiAward, FiFileText, FiUser, FiMenu, FiX, FiSearch, FiFilter, FiDownload, FiShare2 } from "react-icons/fi";
import React, { useState } from "react";
import Sidebar from "@/components/instructor/Sidebar";
import Header from "@/components/instructor/Header";
import Assignments from "@/components/instructor/sections/Assignments";
import Submissions from "@/components/instructor/sections/Submissions";
import CourseCard from "@/components/Course/CourseCard";
import CourseDashboard from "@/components/Course/CourseDashboard";
import StudentProfile from "@/components/student/StudentProfile";
import EnrolledCourse from "@/components/Course/enrolled/EnrolledCourse";
const navItems = [
    { id: "courses", icon: FiHome, label: "Courses" },
    { id: "enrolled", icon: FiBook, label: "Enrolled" },
    { id: "article", icon: FiFileText, label: "Articles" },
    { id: "assignment", icon:  FiClipboard , label: "Assignment" },
    { id: "profile", icon: FiUser, label: "Profile" },
    { id: "certificates", icon: FiAward, label: "Certificates" },
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
            {activeSection === "courses" && <CourseDashboard/>}
           {activeSection === "enrolled" && <EnrolledCourse/>}
            {activeSection === "assignments" && <Assignments />} 
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
