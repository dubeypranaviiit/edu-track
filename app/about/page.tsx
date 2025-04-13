"use client"
import { useState, useEffect } from "react";
import Hero from "@/components/About/Hero";
import Mission from "@/components/About/Mission";
import Features from "@/components/About/Features";
import Team from "@/components/About/Team";
import CTA from "@/components/About/CTA";
import { FiBook, FiTarget, FiUsers } from "react-icons/fi";
 import Footer from "@/components/Home/Footer";
const page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setIsVisible(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "Personalized Learning",
      icon: <FiBook className="text-4xl" />,
      description: "Adaptive pathways tailored to each student"
    },
    {
      title: "Real-time Analytics",
      icon: <FiTarget className="text-4xl" />,
      description: "Comprehensive tracking and insights"
    },
    {
      title: "Collaborative Tools",
      icon: <FiUsers className="text-4xl" />,
      description: "Enhanced student-teacher interaction"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Visionary leader with 15+ years in EdTech"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Tech innovator passionate about educational accessibility"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Education",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Former educator transforming digital learning"
    }
  ];

  return (
    <div className={`${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <Hero />
      <Mission isVisible={isVisible} />
      <Features features={features} />
  
      <Team members={teamMembers} />
      <CTA />
     <Footer />
    </div>
  );
};

export default page;
