"use client";
import { create } from "zustand";
import axios from "axios";
import { Course, Item } from "@/types/course";

interface ActiveCourseStore {
  course: Course | null;
  selectedItem: Item | null;
  loading: boolean;
  activeSlug: string | null;

  fetchCourseBySlug: (slug: string) => Promise<void>;
  setSelectedItem: (item: Item) => void;
  clearCourse: () => void;
}

export const useActiveCourseStore = create<ActiveCourseStore>((set, get) => ({
  course: null,
  selectedItem: null,
  loading: false,
  activeSlug: null,

  fetchCourseBySlug: async (slug) => {
    const { course, activeSlug } = get();
    if (course && activeSlug === slug) {
      return;
    }

    set({ loading: true });

    try {
      const res = await axios.get(`/api/courses/${slug}`);
      const data = res.data;

      if (data.course) {
        const firstItem =
          data.course.chapters?.[0]?.subtopics?.[0]?.items?.[0] ?? null;

        set({
          course: data.course,
          selectedItem: firstItem,
          activeSlug: slug,
          loading: false,
        });
      } else {
        set({ course: null, selectedItem: null, loading: false });
      }
    } catch (err) {
      console.error("Fetch active course failed", err);
      set({ loading: false });
    }
  },

  setSelectedItem: (item) => set({ selectedItem: item }),

  clearCourse: () =>
    set({ course: null, selectedItem: null, activeSlug: null }),
}));
