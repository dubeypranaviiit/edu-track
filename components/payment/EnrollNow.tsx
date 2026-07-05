"use client";
import React from "react";

import { useUserStore } from "@/store/useUserStore";

interface Props {
  course: any;
  userId?: string;
}

const EnrollNow = ({ course, userId }: Props) => {
  const { profile } = useUserStore();
  const isInstructor = profile?.role === "instructor";

  const finalPrice =
    course.discountPercent > 0
      ? course.originalPrice - (course.originalPrice * course.discountPercent) / 100
      : course.originalPrice;

  const handleEnroll = async () => {
    if (!userId) return alert("Please login to enroll");
    if (isInstructor) return alert("Instructors cannot enroll in courses");

    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          userId,
          amount: finalPrice,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert(data.message || "Payment initiation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  if (isInstructor) {
    return (
      <button
        disabled
        className="w-full bg-gray-600 text-gray-300 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
      >
        Instructors Cannot Enroll
      </button>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
    >
      Enroll Now - ₹{finalPrice}
    </button>
  );
};

export default EnrollNow;
