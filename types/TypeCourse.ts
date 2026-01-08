export interface InstructorType {
    _id: string;
    name: string;
    role: string;
    logo: string;
  }
  
  export interface ItemType {
    _id: string;
    title: string;
    type: "video" | "reading" | "assignment";
    videoUrl?: string;
    content?: string;
    resources?: string[];
  }
  
  export interface SubtopicType {
    _id: string;
    title: string;
    items: ItemType[];
  }
  
  export interface ChapterType {
    _id: string;
    title: string;
    subtopics: SubtopicType[];
  }
  
  export interface ReviewType {
    _id: string;
    rating: number;
    comment: string;
    student: {
      name: string;
      avatar: string;
    };
  }
  
  export interface TestimonialType {
    name: string;
    image: string;
    role: string;
    text: string;
  }
  
  export interface CourseType {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    logo?: string;
    originalPrice: number;
    discountPercent: number;
    isPublished: boolean;
    instructor: InstructorType;
    category?: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: string;
    features: string[];
    certificate: boolean;
    dateAdded: string;
    chapters: ChapterType[];
    reviews: ReviewType[];
    totalEnrollments: number;
    finalPrice: number; // from virtual
    testimonials?: TestimonialType[];
  }
  