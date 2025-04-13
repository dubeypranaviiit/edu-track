import React from "react";
import Link from "next/link";
const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
        Learn Smarter. Achieve More.
      </h1>
      <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
        Explore expertly crafted courses designed to help you excel in your academic journey.
      </p>
      <Link href="/course" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-xl">
        Explore Courses
      </Link>
    </section>
  );
};

export default HeroSection;
