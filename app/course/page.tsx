"use client";
import React, { useEffect } from "react";
import Loader from "@/components/Home/Loader";
import CourseDashboard from "@/components/Course/CourseDashboard";
import {useFetchCourseStore } from "@/store/useFetchCourseStore"; 

const Page: React.FC = () => {
  const {
    courses,
    loadingCourses,
    errorCourses,
    fetchCourses,
  } = useFetchCourseStore ();

 
  if (loadingCourses) return <Loader />;
  if (errorCourses) return <div>Failed to load course data</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <main className="grow py-10 px-6">
        <CourseDashboard/>
      </main>
    </div>
  );
};

export default Page;
