import React from "react";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/Working";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Testimonials from "@/components/Home/Testimonials";
import OurCourse from "@/components/Home/OurCourse";
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
