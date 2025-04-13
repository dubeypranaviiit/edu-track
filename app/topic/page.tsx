// "use client";

// import { useState } from "react";
// import Sidebar from "@/components/active/Sidebar";
// import CoursePlayer from "@/components/active/CoursePlayer";
// import CourseHeader from "@/components/active/CourseHeader";
// import { mockCourse } from "@/lib/mockCourse";
// import { Item } from "@/types/course";

// const CoursePage = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<Item>(
//     mockCourse.chapters[0].subtopics[0].items[0]
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50 text-gray-900">
//       <Sidebar
//         chapters={mockCourse.chapters}
//         selectedItem={selectedItem}
//         onItemSelect={setSelectedItem}
//         isOpen={isSidebarOpen}
//         onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
//       />
//       <main className="flex-1 flex flex-col">
//         <CourseHeader
//           title={mockCourse.title}
//           onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         />
//         <CoursePlayer item={selectedItem} />
//       </main>
//     </div>
//   );
// };

// export default CoursePage;
"use client";

import { useState } from "react";
import Sidebar from "@/components/active/Sidebar";
import CoursePlayer from "@/components/active/CoursePlayer";
import CourseHeader from "@/components/active/CourseHeader";
import { Course, Item } from "@/types/course"; // assumes type includes nested chapters/subtopics/items
import { getCourseBySlug } from "@/lib/data"; // hypothetical fetch function

export default function CoursePage({ course }: { course: Course }) {
  const firstItem = course.chapters[0]?.subtopics[0]?.items[0];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(firstItem || null);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar
        chapters={course.chapters}
        selectedItem={selectedItem}
        onItemSelect={setSelectedItem}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="flex-1 flex flex-col">
        <CourseHeader
          title={course.title}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <CoursePlayer item={selectedItem} />
      </main>
    </div>
  );
}
