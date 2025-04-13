// types.ts
export interface CourseModule {
    title: string;
    duration: string;
    lessons: string[];
  }
  
  export interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
  }
  
  export interface Instructor {
    name: string;
    role: string;
    image: string;
    bio: string;
    social: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  }
  
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  export interface CourseData {
    title: string;
    rating: number;
    reviews: number;
    instructor: Instructor;
    price: number;
    features: string[];
    modules: CourseModule[];
    testimonials: Testimonial[];
    faqs: FAQ[];
  }
  export interface CourseType {
    _id: string;
    title: string;
    slug: string;
    rating: number;
    reviews: number;
    price: number;
    finalPrice?: number;
    features: string[];
    instructor: {
      name: string;
      role: string;
      image: string;
    };
    chapters: {
      _id: string;
      title: string;
      subtopics: {
        _id: string;
        title: string;
        type: "video" | "assignment" | "reading";
      }[];
    }[];
    testimonials?: {
      name: string;
      role: string;
      image: string;
      text: string;
    }[];
  }
  