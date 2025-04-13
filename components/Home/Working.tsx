"use client";
import React from "react";
import {
  FiUserPlus,
  FiBookOpen,
  FiPlayCircle,
  FiAward,
} from "react-icons/fi";

const steps = [
  {
    icon: <FiUserPlus />,
    title: "Join the Platform",
    desc: "Sign up and create your personalized learner profile.",
  },
  {
    icon: <FiBookOpen />,
    title: "Choose a Course",
    desc: "Explore curated courses tailored to your interests and goals.",
  },
  {
    icon: <FiPlayCircle />,
    title: "Start Learning",
    desc: "Engage with videos, notes, quizzes, and real-time practice.",
  },
  {
    icon: <FiAward />,
    title: "Earn Certificate",
    desc: "Complete the course and receive a verified certificate.",
  },
];

const Working: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 text-5xl bg-blue-100 p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;
