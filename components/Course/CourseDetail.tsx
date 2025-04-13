// "use client";

// import { useState } from "react";
// import {
//   FaStar, FaPlay, FaChevronDown, FaChevronUp, FaVideo, FaShare
// } from "react-icons/fa";
// import { BsCheckCircle } from "react-icons/bs";
// import Image from "next/image";
// import { CourseData } from "@/types/types";
// //  import { Image } from "next/image";
// interface Props {
//   course: CourseData;
// }

// const CourseDetail = ({ course }: Props) => {
//   const [activeModule, setActiveModule] = useState<number | null>(null);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Hero */}
//       <div className="relative h-96 bg-gradient-to-r from-blue-900 to-gray-900">
//         <div className="container mx-auto px-4 py-20">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">{course.title}</h1>
//           <div className="flex items-center space-x-4 mb-6">
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 className={`w-5 h-5 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-400"}`}
//               />
//             ))}
//             <span>({course.reviews} reviews)</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Image
//               src={course.instructor.image}
//               alt={course.instructor.name}
//               width={64}
//               height={64}
//               className="rounded-full object-cover"
//             />
//             <div>
//               <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
//               <p className="text-gray-300">{course.instructor.role}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           {/* What You'll Learn */}
//           <section className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {["Master Full Stack Development", "Build Real Projects", "Deploy Applications", "Best Practices"].map((item, index) => (
//                 <div key={index} className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
//                   <BsCheckCircle className="text-green-400" />
//                   <span>{item}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Course Modules */}
//           <section className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Course Content</h2>
//             {course.modules.map((module, index) => (
//               <div key={index} className="mb-4">
//                 <button
//                   onClick={() => setActiveModule(activeModule === index ? null : index)}
//                   className="w-full flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <FaPlay className="text-blue-400" />
//                     <span>{module.title}</span>
//                   </div>
//                   {activeModule === index ? <FaChevronUp /> : <FaChevronDown />}
//                 </button>
//                 {activeModule === index && (
//                   <div className="mt-2 ml-4 p-4 bg-gray-700 rounded-lg">
//                     {module.lessons.map((lesson, i) => (
//                       <div key={i} className="flex items-center space-x-2 py-1">
//                         <FaVideo className="text-blue-400" />
//                         <span>{lesson}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </section>

//           {/* Testimonials */}
//           <section className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Student Testimonials</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {course.testimonials.map((t, i) => (
//                 <div key={i} className="bg-gray-700 p-4 rounded-lg">
//                   <div className="flex space-x-4 mb-2">
//                     <Image
//                       src={t.image}
//                       alt={t.name}
//                       width={48}
//                       height={48}
//                       className="rounded-full object-cover"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{t.name}</h4>
//                       <p className="text-gray-400">{t.role}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-300">"{t.text}"</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* Sidebar */}
//         <aside className="lg:sticky top-4 h-fit bg-gray-800 p-6 rounded-lg">
//           <div className="text-3xl font-bold mb-6">${course.price}</div>
//           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-6">
//             Enroll Now
//           </button>
//           <div className="space-y-3">
//             {course.features.map((feature, i) => (
//               <div key={i} className="flex items-center space-x-2">
//                 <BsCheckCircle className="text-green-400" />
//                 <span>{feature}</span>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 pt-6 border-t border-gray-700">
//             <button className="w-full flex justify-center items-center space-x-2 py-2 border border-gray-600 rounded-lg hover:bg-gray-700">
//               <FaShare />
//               <span>Share Course</span>
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;
"use client";

import { useState } from "react";
import {
  FaStar, FaPlay, FaChevronDown, FaChevronUp, FaVideo, FaShare
} from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import Image from "next/image";
import { CourseType } from "@/types/types"; // Adapt this to match your Mongoose course schema

interface Props {
  course: CourseType;
}

const CourseDetail = ({ course }: Props) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{course.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-5 h-5 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-400"}`}
              />
            ))}
            <span>({course.reviews} reviews)</span>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src={course.instructor.image}
              alt={course.instructor.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
              <p className="text-gray-300">{course.instructor.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* What You'll Learn */}
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.features.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
                  <BsCheckCircle className="text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Course Modules */}
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            {course.chapters.map((chapter, index) => (
              <div key={chapter._id || index} className="mb-4">
                <button
                  onClick={() => setActiveModule(activeModule === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <FaPlay className="text-blue-400" />
                    <span>{chapter.title}</span>
                  </div>
                  {activeModule === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {activeModule === index && (
                  <div className="mt-2 ml-4 p-4 bg-gray-700 rounded-lg">
                    {chapter.subtopics.map((subtopic, i) => (
                      <div key={subtopic._id || i} className="flex items-center space-x-2 py-1">
                        <FaVideo className="text-blue-400" />
                        <span>{subtopic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Testimonials - Optional */}
          {course.testimonials && course.testimonials.length > 0 && (
            <section className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Student Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.testimonials.map((t, i) => (
                  <div key={i} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex space-x-4 mb-2">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <p className="text-gray-400">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">"{t.text}"</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky top-4 h-fit bg-gray-800 p-6 rounded-lg">
          <div className="text-3xl font-bold mb-6">${course.finalPrice || course.price}</div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-6">
            Enroll Now
          </button>
          <div className="space-y-3">
            {course.features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2">
                <BsCheckCircle className="text-green-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button className="w-full flex justify-center items-center space-x-2 py-2 border border-gray-600 rounded-lg hover:bg-gray-700">
              <FaShare />
              <span>Share Course</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetail;
