// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useParams } from "next/navigation";
// // // import Sidebar from "@/components/active/Sidebar";
// // // import CoursePlayer from "@/components/active/CoursePlayer";
// // // import CourseHeader from "@/components/active/CourseHeader";
// // // import { Course, Item } from "@/types/course";

// // // export default function CoursePage() {
// // //   const { slug } = useParams();
// // //   const [course, setCourse] = useState<Course | null>(null);
// // //   const [selectedItem, setSelectedItem] = useState<Item | null>(null);
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchCourse = async () => {
// // //       try {
// // //         const res = await fetch(`/api/courses/${slug}`);
        
// // //         const data = await res.json();
// // //         if (data.course) {
// // //           setCourse(data.course);
// // //           // Set first video item by default
// // //           const firstItem =
// // //             data.course.chapters?.[0]?.subtopics?.[0]?.items?.[0] ?? null;
// // //           setSelectedItem(firstItem);
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCourse();
// // //   }, [slug]);

// // //   if (loading) return <div className="text-center mt-20">Loading...</div>;
// // //   if (!course) return <div className="text-center mt-20 text-red-500">Course not found</div>;

// // //   return (
// // //     <div className="flex min-h-screen bg-gray-50 text-gray-900">
// // //       <Sidebar
// // //         chapters={course.chapters}
// // //         selectedItem={selectedItem}
// // //         onItemSelect={setSelectedItem}
// // //         isOpen={isSidebarOpen}
// // //         onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
// // //       />

// // //       <main className="flex-1 flex flex-col">
// // //         <CourseHeader
// // //           title={course.title}
// // //           onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // //         />

// // //         {selectedItem ? (
// // //           <CoursePlayer item={selectedItem} />
// // //         ) : (
// // //           <div className="flex-1 flex items-center justify-center text-gray-500">
// // //             No content available.
// // //           </div>
// // //         )}
// // //       </main>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import CourseHeader from "@/components/active/CourseHeader";
// // import CoursePlayer from "@/components/active/CoursePlayer";
// // import CourseContentSidebar from "@/components/active/CourseContentSidebar";
// // import { Course, Item } from "@/types/course";

// // export default function CoursePage() {
// //   const { slug } = useParams();
// //   const [course, setCourse] = useState<Course | null>(null);
// //   const [selectedItem, setSelectedItem] = useState<Item | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchCourse() {
// //       try {
// //         const res = await fetch(`/api/courses/${slug}`);
// //         const data = await res.json();

// //         if (data.course) {
// //           setCourse(data.course);
// //           const firstItem =
// //             data.course.chapters?.[0]?.subtopics?.[0]?.items?.[0] ?? null;
// //           setSelectedItem(firstItem);
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchCourse();
// //   }, [slug]);

// //   if (loading) return <div className="mt-20 text-center">Loading...</div>;
// //   if (!course) return <div className="mt-20 text-center text-red-500">Course not found</div>;

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-50">
// //       <CourseHeader title={course.title} />

// //       <div className="flex flex-1 overflow-hidden">
// //         {/* Player */}
// //         <div className="flex-1 overflow-hidden">
// //           <CoursePlayer item={selectedItem} />
// //         </div>

// //         {/* Sidebar */}
// //         <div className="w-96 border-l bg-white overflow-hidden">
// //           <CourseContentSidebar
// //             chapters={course.chapters}
// //             selectedItemId={selectedItem?._id}
// //             onItemSelect={setSelectedItem}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import CourseHeader from "@/components/active/CourseHeader";
// import CoursePlayer from "@/components/active/CoursePlayer";
// import CourseContentSidebar from "@/components/active/CourseContentSidebar";
// import { Course, Item } from "@/types/course";

// export default function CoursePage() {
//   const { slug } = useParams();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [selectedItem, setSelectedItem] = useState<Item | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCourse() {
//       try {
//         const res = await fetch(`/api/courses/${slug}`);
//         const data = await res.json();

//         if (data.course) {
//           setCourse(data.course);
//           setSelectedItem(
//             data.course.chapters?.[0]?.subtopics?.[0]?.items?.[0] ?? null
//           );
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCourse();
//   }, [slug]);

//   if (loading) return <div className="mt-20 text-center">Loading...</div>;
//   if (!course) return <div className="mt-20 text-center text-red-500">Course not found</div>;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <CourseHeader title={course.title} />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Player */}
//         <div className="flex-1 bg-black overflow-hidden">
//           <CoursePlayer item={selectedItem} />
//         </div>

//         {/* Sidebar */}
//         <aside className="w-[380px] border-l bg-white overflow-y-auto">
//           <CourseContentSidebar
//             chapters={course.chapters}
//             selectedItemId={selectedItem?._id}
//             onItemSelect={setSelectedItem}
//           />
//         </aside>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import CourseHeader from "@/components/active/CourseHeader";
import CoursePlayer from "@/components/active/CoursePlayer";
import CourseContentSidebar from "@/components/active/CourseContentSidebar";
import { useActiveCourseStore } from "@/store/useActiveCourseStore";
type Props = {
  title: string;
  onMenuClick?: () => void; 
};
export default function CoursePage() {
  const { slug } = useParams();

  const {
    course,
    selectedItem,
    loading,
    fetchCourseBySlug,
    setSelectedItem,
  } = useActiveCourseStore();

  useEffect(() => {
    if (slug) fetchCourseBySlug(slug as string);
  }, [slug]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;
  if (!course)
    return <div className="mt-20 text-center text-red-500">Course not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CourseHeader title={course.title} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-black">
          <CoursePlayer item={selectedItem} />
        </div>

        <aside className="w-[380px] border-l bg-white overflow-y-auto">
          <CourseContentSidebar
            chapters={course.chapters}
            selectedItemId={selectedItem?._id}
            onItemSelect={setSelectedItem}
          />
        </aside>
      </div>
    </div>
  );
}
