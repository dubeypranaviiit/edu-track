export interface Item {
  _id: string;
  title: string;
  type: "video" | "reading" | "assignment";
  uploadType?: "upload" | "url";
  videoUrl?: string;
  content?: string;
  resources?: string[];
}

export interface Subtopic {
  _id: string;
  title: string;
  items: Item[];
}

export interface Chapter {
  _id: string;
  title: string;
  subtopics: Subtopic[];
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  logo?: string;
  originalPrice: number;
  discountPercent?: number;
  finalPrice?: number;
  isPublished: boolean;
  duration: string;
  certificate?: boolean;
  level: "beginner" | "intermediate" | "advanced";
  category?: string;
  features?: string[];
  instructor?: any;
  chapters: Chapter[];
}
