"use client";
import React from "react";
import Image from "next/image";
import { FiStar, FiStar as EmptyStar, FiStar as FilledStar } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Aarav Sharma",
    role: "Computer Science Student, India",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "This platform made learning fun and interactive! The projects helped me land an internship.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Instructor, Data Science (USA)",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "Creating and managing my course was super easy. Loved the flexibility and student engagement.",
    rating: 5,
  },
  {
    name: "Mohamed El-Tayeb",
    role: "Admin, Nile University",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    content:
      "Managing users and tracking progress is effortless. The dashboard and analytics are top-notch.",
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          What Our Learners & Educators Say
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
          className="max-w-3xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                {/* <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4 object-cover"
                /> */}
                <h4 className="font-bold text-xl text-blue-600">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 mb-3">{testimonial.role}</p>
                <p className="text-gray-700 mb-5 leading-relaxed italic">
                  “{testimonial.content}”
                </p>
                <div className="flex justify-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < testimonial.rating ? (
                      <FilledStar key={i} />
                    ) : (
                      <EmptyStar key={i} className="opacity-30" />
                    )
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
