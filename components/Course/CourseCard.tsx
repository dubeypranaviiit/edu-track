// // // // // components/CourseCard.tsx
// // // // import React from "react";
// // // // import Link from "next/link";
// // // // export type CourseCardProps = {
// // // //   imageUrl: string;
// // // //   logoUrl: string;
// // // //   title: string;
// // // //   subtitle: string;
// // // //   instructor: string;
// // // //   price: number;
// // // //   originalPrice: number;
// // // //   discountPercent: number;
// // // //   duration: string;
// // // //   lessons: number;
// // // //   certificate: boolean;
// // // // };
// // // // import { Button } from "../ui/button";
// // // // const CourseCard: React.FC<CourseCardProps> = ({
// // // //   imageUrl,
// // // //   logoUrl,
// // // //   title,
// // // //   subtitle,
// // // //   instructor,
// // // //   price,
// // // //   originalPrice,
// // // //   discountPercent,
// // // //   duration,
// // // //   lessons,
// // // //   certificate,
// // // // }) => {
// // // //   return (
// // // //     <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
// // // //       <div className="relative">
// // // //         <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
// // // //           <img
// // // //             src={logoUrl}
// // // //             alt="Course Logo"
// // // //             className="w-8 h-8 rounded-full bg-white p-1"
// // // //           />
// // // //           <span className="text-white font-semibold text-sm">{subtitle}</span>
// // // //         </div>
// // // //         <img
// // // //           src={imageUrl}
// // // //           alt={title}
// // // //           className="w-full h-48 object-cover"
// // // //         />
// // // //         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
// // // //           <h3 className="text-white font-bold text-xl">{title}</h3>
// // // //           <p className="text-gray-300 text-sm">with {instructor}</p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="p-6 space-y-4">
// // // //         <div className="flex items-center space-x-3">
// // // //           <span className="text-blue-500 font-bold text-2xl">₹{price}</span>
// // // //           <span className="text-gray-500 line-through text-lg">₹{originalPrice}</span>
// // // //           <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
// // // //             {discountPercent}% OFF
// // // //           </span>
// // // //         </div>

// // // //         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition duration-300">
// // // //           Enroll Now
// // // //         </button>


// // // //         <div className="flex items-center space-x-2 text-gray-400 text-sm">
// // // //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //           </svg>
// // // //           <span>{duration} • {lessons} lessons • {certificate ? "Certificate included" : "No certificate"}</span>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CourseCard;
// // // // components/CourseCard.tsx
// // // // import React from "react";
// // // // import Link from "next/link";

// // // // export type CourseCardProps = {
// // // //   imageUrl: string;
// // // //   logoUrl: string;
// // // //   title: string;
// // // //   subtitle: string;
// // // //   instructor: string;
// // // //   originalPrice: number;
// // // //   discountPercent: number;
// // // //   finalPrice: number;
// // // //   duration: string;
// // // //   lessons: number;
// // // //   certificate: boolean;
// // // // };

// // // // const CourseCard: React.FC<CourseCardProps> = ({
// // // //   imageUrl,
// // // //   logoUrl,
// // // //   title,
// // // //   subtitle,
// // // //   instructor,
// // // //   originalPrice,
// // // //   discountPercent,
// // // //   finalPrice,
// // // //   duration,
// // // //   lessons,
// // // //   certificate,
// // // // }) => {
// // // //   return (
// // // //     <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
// // // //       <div className="relative">
// // // //         <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
// // // //           <img
// // // //             src={logoUrl}
// // // //             alt="Course Logo"
// // // //             className="w-8 h-8 rounded-full bg-white p-1"
// // // //           />
// // // //           <span className="text-white font-semibold text-sm">{subtitle}</span>
// // // //         </div>
// // // //         <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
// // // //         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
// // // //           <h3 className="text-white font-bold text-xl">{title}</h3>
// // // //           <p className="text-gray-300 text-sm">with {instructor}</p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="p-6 space-y-4">
// // // //         <div className="flex items-center space-x-3">
// // // //           <span className="text-blue-500 font-bold text-2xl">₹{finalPrice}</span>
// // // //           {discountPercent > 0 && (
// // // //             <>
// // // //               <span className="text-gray-500 line-through text-lg">₹{originalPrice}</span>
// // // //               <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
// // // //                 {discountPercent}% OFF
// // // //               </span>
// // // //             </>
// // // //           )}
// // // //         </div>

// // // //         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition duration-300">
// // // //           Enroll Now
// // // //         </button>

// // // //         <div className="flex items-center space-x-2 text-gray-400 text-sm">
// // // //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //           </svg>
// // // //           <span>
// // // //             {duration} • {lessons} lessons •{" "}
// // // //             {certificate ? "Certificate included" : "No certificate"}
// // // //           </span>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CourseCard;
// // // "use client"
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Link from "next/link";

// // // export type CourseCardProps = {
// // //   imageUrl: string;
// // //   logoUrl: string;
// // //   title: string;
// // //   subtitle: string;
// // //   instructor: string;
// // //   originalPrice: number;
// // //   discountPercent: number;
// // //   duration: string;
// // //   lessons: number;
// // //   certificate: boolean;
// // // };

// // // const CourseCard: React.FC<CourseCardProps> = () => {
// // //   const [courseData, setCourseData] = useState<CourseCardProps | null>(null);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const fetchCourseData = async () => {
// // //       try {
// // //         // Replace with your backend API endpoint to fetch course data
// // //         const response = await axios.get("/api/courses"); // Example URL
// // //         setCourseData(response.data); // Assuming the response has course data
// // //       } catch (error) {
// // //         setError("Failed to load course data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCourseData();
// // //   }, []);

// // //   // Calculate final price from original price and discount percent
// // //   const calculateFinalPrice = (originalPrice: number, discountPercent: number) => {
// // //     if (discountPercent > 0) {
// // //       return originalPrice - (originalPrice * discountPercent) / 100;
// // //     }
// // //     return originalPrice;
// // //   };

// // //   if (loading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>{error}</div>;
// // //   }

// // //   if (!courseData) {
// // //     return <div>No course data available</div>;
// // //   }

// // //   const finalPrice = calculateFinalPrice(courseData.originalPrice, courseData.discountPercent);

// // //   return (
// // //     <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
// // //       <div className="relative">
// // //         <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
// // //           <img
// // //             src={courseData.logoUrl}
// // //             alt="Course Logo"
// // //             className="w-8 h-8 rounded-full bg-white p-1"
// // //           />
// // //           <span className="text-white font-semibold text-sm">{courseData.subtitle}</span>
// // //         </div>
// // //         <img src={courseData.imageUrl} alt={courseData.title} className="w-full h-48 object-cover" />
// // //         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
// // //           <h3 className="text-white font-bold text-xl">{courseData.title}</h3>
// // //           <p className="text-gray-300 text-sm">with {courseData.instructor}</p>
// // //         </div>
// // //       </div>

// // //       <div className="p-6 space-y-4">
// // //         <div className="flex items-center space-x-3">
// // //           <span className="text-blue-500 font-bold text-2xl">₹{finalPrice}</span>
// // //           {courseData.discountPercent > 0 && (
// // //             <>
// // //               <span className="text-gray-500 line-through text-lg">₹{courseData.originalPrice}</span>
// // //               <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
// // //                 {courseData.discountPercent}% OFF
// // //               </span>
// // //             </>
// // //           )}
// // //         </div>

// // //         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition duration-300">
// // //           Enroll Now
// // //         </button>

// // //         <div className="flex items-center space-x-2 text-gray-400 text-sm">
// // //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //           </svg>
// // //           <span>
// // //             {courseData.duration} • {courseData.lessons} lessons •{" "}
// // //             {courseData.certificate ? "Certificate included" : "No certificate"}
// // //           </span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CourseCard;

// // import React from "react";

// // export type CourseCardProps = {
// //   thumbnail: string;
// //   logo: string;
// //   title: string;
// //   subtitle: string;
// //   instructor: string;
// //   originalPrice: number;
// //   discountPercent: number;
// //   duration: string;
// //   lessons: number;
// //   certificate: boolean;
// //   slug:string;
// // };

// // const CourseCard: React.FC<CourseCardProps> = ({
// //   thumbnail,
// //   logo,
// //   title,
// //   subtitle,
// //   instructor,
// //   originalPrice,
// //   discountPercent,
// //   duration,
// //   lessons,
// //   certificate,
// // }) => {
// //   // Calculate final price from original price and discount percent
// //   const calculateFinalPrice = (originalPrice: number, discountPercent: number) => {
// //     if (discountPercent > 0) {
// //       return originalPrice - (originalPrice * discountPercent) / 100;
// //     }
// //     return originalPrice;
// //   };

// //   const finalPrice = calculateFinalPrice(originalPrice, discountPercent);

// //   return (
// //     <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
// //       <div className="relative">
// //         <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
// //           <img
// //             src={logo}
// //             alt="Course Logo"
// //             className="w-8 h-8 rounded-full bg-white p-1"
// //           />
// //           <span className="text-white font-semibold text-sm">{subtitle}</span>
// //         </div>
// //         <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
// //         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
// //           <h3 className="text-white font-bold text-xl">{title}</h3>
// //           <p className="text-gray-300 text-sm">with {instructor}</p>
// //         </div>
// //       </div>

// //       <div className="p-6 space-y-4">
// //         <div className="flex items-center space-x-3">
// //           <span className="text-blue-500 font-bold text-2xl">₹{finalPrice}</span>
// //           {discountPercent > 0 && (
// //             <>
// //               <span className="text-gray-500 line-through text-lg">₹{originalPrice}</span>
// //               <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
// //                 {discountPercent}% OFF
// //               </span>
// //             </>
// //           )}
// //         </div>

// //         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition duration-300">
// //           Enroll Now
// //         </button>

// //         <div className="flex items-center space-x-2 text-gray-400 text-sm">
// //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //           </svg>
// //           <span>
// //             {duration} • {lessons} lessons •{" "}
// //             {certificate ? "Certificate included" : "No certificate"}
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseCard;
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// export type CourseCardProps = {
//   thumbnail: string;
//   logo: string;
//   title: string;
//   subtitle: string;
//   instructor: string;
//   originalPrice: number;
//   discountPercent: number;
//   duration: string;
//   lessons: number;
//   certificate: boolean;
//   slug: string;
// };

// const CourseCard: React.FC<CourseCardProps> = ({
//   thumbnail,
//   logo,
//   title,
//   subtitle,
//   instructor,
//   originalPrice,
//   discountPercent,
//   duration,
//   lessons,
//   certificate,
//   slug,
// }) => {
//   const router = useRouter();

//   const handleEnrollClick = () => {
//     router.push(`/course/${slug}`);
//   };

//   const finalPrice =
//     discountPercent > 0
//       ? originalPrice - (originalPrice * discountPercent) / 100
//       : originalPrice;

//   return (
//     <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
//       <div className="relative">
//         <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
//           <img
//             src={logo}
//             alt="Course Logo"
//             className="w-8 h-8 rounded-full bg-white p-1"
//           />
//           <span className="text-white font-semibold text-sm">{subtitle}</span>
//         </div>
//         <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//           <h3 className="text-white font-bold text-xl">{title}</h3>
//           <p className="text-gray-300 text-sm">with {instructor}</p>
//         </div>
//       </div>

//       <div className="p-6 space-y-4">
//         <div className="flex items-center space-x-3">
//           <span className="text-blue-500 font-bold text-2xl">₹{finalPrice}</span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-gray-500 line-through text-lg">₹{originalPrice}</span>
//               <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                 {discountPercent}% OFF
//               </span>
//             </>
//           )}
//         </div>

//         <button
//           onClick={handleEnrollClick}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition duration-300"
//         >
//           Enroll Now
//         </button>

//         <div className="flex items-center space-x-2 text-gray-400 text-sm">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>
//             {duration} • {lessons} lessons •{" "}
//             {certificate ? "Certificate included" : "No certificate"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
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
};

const CourseCard: React.FC<CourseCardProps> = ({
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
}) => {
  const router = useRouter();

  const handleViewCourse = () => {
    router.push(`/course/${slug}`);
  };

  const handleEnrollClick = () => {
    router.push(`/payment?courseSlug=${slug}`);
  };

  const finalPrice =
    discountPercent > 0
      ? originalPrice - (originalPrice * discountPercent) / 100
      : originalPrice;

  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-gray-900 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <img
            src={logo}
            alt="Course Logo"
            className="w-8 h-8 rounded-full bg-white p-1"
          />
          <span className="text-white font-semibold text-sm">{subtitle}</span>
        </div>
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
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

        <div className="flex space-x-2">
          <button
            onClick={handleViewCourse}
            className="w-1/2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
          >
            View Course
          </button>

          <button
            onClick={handleEnrollClick}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
          >
            Enroll Now
          </button>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {duration} • {lessons} lessons •{" "}
            {certificate ? "Certificate included" : "No certificate"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
