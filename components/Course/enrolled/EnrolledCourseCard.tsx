"use client";
import React from "react";
import { useRouter } from "next/navigation";

export type CourseCardProps = {
  thumbnail: string;
  logo: string;
  title: string;
  subtitle: string;
  instructor: string;
  originalPrice: number;
  discountPercent: number;
  duration: string;
  lessons: number;
  certificate: boolean;
  slug: string;
  finalPrice: number;
};

const EnrolledCourseCard: React.FC<CourseCardProps> = ({
  thumbnail,
  logo,
  title,
  subtitle,
  instructor,
  originalPrice,
  discountPercent,
  duration,
  lessons,
  certificate,
  slug,
  finalPrice,
}) => {
  const router = useRouter();
  const handleViewCourse = () => {
    router.push(`/enrolled/${slug}`);
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <img
            src={logo || "/logo.png"}
            alt="Course Logo"
            className="w-8 h-8 rounded-full bg-white p-1"
          />
          <span className="text-white font-semibold text-sm">{subtitle}</span>
        </div>
        <img
          src={thumbnail || "/course-placeholder.jpg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-gray-300 text-sm">with {instructor}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-blue-500 font-bold text-2xl">₹{finalPrice}</span>
          {discountPercent > 0 && (
            <>
              <span className="text-gray-500 line-through text-lg">₹{originalPrice}</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleViewCourse}
          className="hover:bg-gray-700 bg-blue-800 text-white font-bold py-2 px-4 w-full rounded-lg transition duration-300 cursor-pointer"
        >
          View Course
        </button>

        <div className="flex items-center space-x-2 text-gray-400 text-sm mt-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {duration || "N/A"} • {lessons || 0} lessons •{" "}
            {certificate ? "Certificate included" : "No certificate"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
