// // import Header from "@/components/Home/Header";
// // import Footer from "@/components/Home/Footer";
// // import CourseDetail from "@/components/Course/CourseDetail";
// // import { CourseData } from "@/types/types";

// // interface Params {
// //   slug: string;
// // }

// // export async function generateStaticParams() {
// //   return [
// //     { slug: "full-stack-masterclass" },
// //     { slug: "data-science-bootcamp" },
// //     { slug: "ai-course" },
// //   ];
// // }

// // const courses: Record<string, CourseData> = {
// //   "full-stack-masterclass": {
// //     title: "Full Stack Development Masterclass",
// //     rating: 4.8,
// //     reviews: 2300,
// //     instructor: {
// //       name: "John Doe",
// //       role: "Senior Developer at TechCorp",
// //       image: "https://randomuser.me/api/portraits/men/1.jpg",
// //       bio: "",
// //       social: {},
// //     },
// //     price: 99.99,
// //     features: ["Live Sessions", "Lifetime Access", "Projects", "Support"],
// //     modules: [
// //       {
// //         title: "Introduction",
// //         duration: "1h",
// //         lessons: ["What is Full Stack?", "Course Overview"],
// //       },
// //       {
// //         title: "Frontend Basics",
// //         duration: "3h",
// //         lessons: ["HTML & CSS", "JavaScript", "React"],
// //       },
// //     ],
// //     testimonials: [
// //       {
// //         name: "Alice",
// //         role: "Frontend Developer",
// //         image: "https://randomuser.me/api/portraits/women/2.jpg",
// //         text: "Loved how real-world this course felt!",
// //       },
// //     ],
// //     faqs: [],
// //   },

// //   "data-science-bootcamp": {
// //     title: "Data Science Bootcamp",
// //     rating: 4.7,
// //     reviews: 1200,
// //     instructor: {
// //       name: "Emily Zhang",
// //       role: "ML Engineer",
// //       image: "https://randomuser.me/api/portraits/women/3.jpg",
// //       bio: "",
// //       social: {},
// //     },
// //     price: 89.0,
// //     features: [
// //       "Datasets",
// //       "Model Deployment",
// //       "Real-world Projects",
// //       "Interview Prep",
// //     ],
// //     modules: [
// //       {
// //         title: "Data Fundamentals",
// //         duration: "2h",
// //         lessons: ["Data Wrangling", "Visualization"],
// //       },
// //       {
// //         title: "Machine Learning",
// //         duration: "4h",
// //         lessons: ["Supervised Learning", "Unsupervised Learning"],
// //       },
// //     ],
// //     testimonials: [],
// //     faqs: [],
// //   },

// //   "ai-course": {
// //     title: "AI For Beginners",
// //     rating: 4.9,
// //     reviews: 900,
// //     instructor: {
// //       name: "Dr. Ravi Kumar",
// //       role: "AI Researcher",
// //       image: "https://randomuser.me/api/portraits/men/4.jpg",
// //       bio: "",
// //       social: {},
// //     },
// //     price: 129,
// //     features: ["AI Basics", "No Coding Needed", "Practical Examples"],
// //     modules: [
// //       {
// //         title: "What is AI?",
// //         duration: "1h",
// //         lessons: ["History of AI", "Applications"],
// //       },
// //     ],
// //     testimonials: [],
// //     faqs: [],
// //   },
// // };

// // export default function page({ params }: { params: Params }) {
// //   const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
// //   const slug = decodeURIComponent(slugParam || "").trim();

// //   console.log("Resolved slug:", slug);
// //   console.log("Available course slugs:", Object.keys(courses));

// //   const course = courses[slug];
// //   // const course = courses[params.slug];
// //    console.log('course is ',course);
// //    console.log("Available course slugs:", Object.keys(courses));
// //   if (!course) {
// //     return (
// //       <div className="min-h-screen flex justify-center items-center text-white bg-gray-900">
// //         <h1 className="text-3xl font-bold">Course Not Found</h1>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
// //       <Header />
// //       <main className="flex-1">
// //         <CourseDetail course={course} />
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }
// import CourseDetail from "@/components/Course/CourseDetail";
// import Header from "@/components/Home/Header";
// import Footer from "@/components/Home/Footer";
// import {connectDB} from "@/lib/mongoose";
// import Course from "@/models/course";
// import Chapter from "@/models/chapter";
// import Subtopic from "@/models/subTopic";
// import { notFound } from "next/navigation";

// interface Params {
//   slug: string;
// }

// export default async function Page({ params }: { params: Params }) {
//   await connectDB();

//   const slug = decodeURIComponent(params.slug.trim());

//   const course = await Course.findOne({ slug })
//     .populate({
//       path: "chapters",
//       populate: {
//         path: "subtopics",
//         model: "Subtopic",
//       },
//     })
//     .populate("instructor");

//   if (!course) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-white bg-gray-900">
//         <h1 className="text-3xl font-bold">Course Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
//       <Header />
//       <main className="flex-1">
//         <CourseDetail course={JSON.parse(JSON.stringify(course))} />
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import CourseDetail from "@/components/Course/CourseDetail";

interface Params {
  params: {
    slug: string;
  };
}

export default function CoursePage({ params }: Params) {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const slug = decodeURIComponent(params.slug.trim());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${slug}`);
        if (response.data?.course) {
          setCourse(response.data.course);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-gray-900">
        <h1 className="text-3xl font-bold">{error || "Course not found"}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />
      <main className="flex-1">
        <CourseDetail course={course} />
      </main>
      <Footer />
    </div>
  );
}
