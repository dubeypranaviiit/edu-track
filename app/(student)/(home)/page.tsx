import React from "react";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/Working";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
import OurCourse from "@/components/home/OurCourse";
const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <OurCourse />
      <Testimonials />
    </main>
  );
};

export default Home;
