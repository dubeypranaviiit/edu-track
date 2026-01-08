import { create } from "zustand";
import axios from "axios";

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  logo?: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice?: number; 
  isPublished: boolean;
  instructor: {
    _id: string;
    name: string;
    email: string;
  };
  category?: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  features?: string[];
  certificate?: boolean;
  totalEnrollments?: number;
  chapters?: any[];
  reviews?: any[];
  createdAt?: string;
  updatedAt?: string;
}

interface CourseStore {
  courses: Course[];
  enrolledCourses: Course[];
  loadingCourses: boolean;
  loadingEnrolled: boolean;
  errorCourses: string | null;
  errorEnrolled: string | null;
  lastFetchedCourses: number | null; // timestamp for courses cache
  lastFetchedEnrolled: number | null; // timestamp for enrolled cache

  fetchCourses: () => Promise<void>;
  fetchEnrolledCourses: (userId: string) => Promise<void>;
  refreshCourses: () => Promise<void>;
  refreshEnrolled: (userId: string) => Promise<void>;
}

export const useFetchCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  enrolledCourses: [],
  loadingCourses: false,
  loadingEnrolled: false,
  errorCourses: null,
  errorEnrolled: null,
  lastFetchedCourses: null,
  lastFetchedEnrolled: null,

  fetchCourses: async () => {
    const now = Date.now();
    const lastFetched = get().lastFetchedCourses;

    // If cache exists and is less than 10 minutes old, return early
    if (lastFetched && now - lastFetched < 10 * 60 * 1000) return;

    set({ loadingCourses: true, errorCourses: null });
    try {
      const res = await axios.get("/api/create-course");
      const data = res.data;
      const coursesArray = Array.isArray(data) ? data : data.courses;
      const published = coursesArray.filter((c: Course) => c.isPublished);
      set({ courses: published, loadingCourses: false, lastFetchedCourses: Date.now() });
    } catch (err: any) {
      set({ errorCourses: err.message, loadingCourses: false });
    }
  },

  fetchEnrolledCourses: async (userId: string) => {
    if (!userId) return;

    const now = Date.now();
    const lastFetched = get().lastFetchedEnrolled;

    // If cache exists and is less than 10 minutes old, return early
    if (lastFetched && now - lastFetched < 10 * 60 * 1000) return;

    set({ loadingEnrolled: true, errorEnrolled: null });
    try {
      const res = await axios.get(`/api/users/enrolled/${userId}`);
      set({
        enrolledCourses: res.data.courses || [],
        loadingEnrolled: false,
        lastFetchedEnrolled: Date.now(),
      });
    } catch (err: any) {
      set({ errorEnrolled: err.message, loadingEnrolled: false });
    }
  },

  refreshCourses: async () => {
    set({ courses: [], lastFetchedCourses: null });
    await get().fetchCourses();
  },

  refreshEnrolled: async (userId: string) => {
    set({ enrolledCourses: [], lastFetchedEnrolled: null });
    await get().fetchEnrolledCourses(userId);
  },
}));
