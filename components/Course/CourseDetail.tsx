"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  FaStar,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaVideo,
  FaShare,
} from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import Image from "next/image";
import EnrollNow from "../payment/EnrollNow";

const CourseDetail = ({ course }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { user } = useUser(); 
  const userId = user?.id;   

  const finalPrice =
    course.discountPercent > 0
      ? course.originalPrice -
        (course.originalPrice * course.discountPercent) / 100
      : course.originalPrice;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{course.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src={course.logo}
              alt={course.instructor}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{course.instructor}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-2 space-y-8">
       
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg"
                >
                  <BsCheckCircle className="text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Course Content */}
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            {course.chapters.map((chapter, index) => (
              <div key={chapter._id || index} className="mb-4">
                <button
                  onClick={() =>
                    setActiveModule(activeModule === index ? null : index)
                  }
                  className="w-full flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <FaPlay className="text-blue-400" />
                    <span>{chapter.title}</span>
                  </div>
                  {activeModule === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {activeModule === index && (
                  <div className="mt-2 ml-4 p-4 bg-gray-700 rounded-lg space-y-2">
                    {chapter.subtopics.map((subtopic, i) => (
                      <div key={subtopic._id || i}>
                        <div className="text-lg font-medium mb-1">
                          {subtopic.title}
                        </div>
                        {subtopic.items.map((item, j) => (
                          <div
                            key={item._id || j}
                            className="flex items-center space-x-2 pl-4 py-1"
                          >
                            <FaVideo className="text-blue-400" />
                            <span>{item.title}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Testimonials */}
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
          <div className="text-3xl font-bold mb-6">
            <h1 className="inline-block text-blue-800 mr-3">₹{finalPrice}</h1>
            <span className="text-gray-500 line-through text-xl">
              ₹{course.originalPrice}
            </span>
          </div>

          {/* Enroll Button */}
          <EnrollNow course={course} userId={userId} />

          <div className="mt-6 space-y-3">
            {course.features.map((feature: any, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <BsCheckCircle className="text-green-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <button className="w-full flex justify-center items-center space-x-2 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer">
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
