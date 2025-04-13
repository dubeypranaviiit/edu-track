import React from "react";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/Working";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Testimonials from "@/components/Home/Testimonials";

import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <Header />
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      {/* <UploadSection /> */}
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Home;
