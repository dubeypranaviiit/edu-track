"use client";
import React from "react";
import {
  BsMortarboard,
  BsStars,
  BsShieldLock,
} from "react-icons/bs";

const features = [
  {
    icon: <BsMortarboard />,
    title: "Expert Instructors",
    desc: "Learn from certified educators and industry leaders who bring real-world experience to every lesson.",
  },
  {
    icon: <BsStars />,
    title: "Personalized Learning",
    desc: "Adaptive paths and skill-based assessments to help you learn at your own pace and level.",
  },
  {
    icon: <BsShieldLock />,
    title: "Verified Certificates",
    desc: "Receive shareable certificates to validate your learning and boost your career or academic profile.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-[#f9fafb] py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500 mb-16">
          Why Choose Our Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl"
            >
              <div className="text-violet-600 bg-violet-100 p-4 rounded-full text-5xl mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
