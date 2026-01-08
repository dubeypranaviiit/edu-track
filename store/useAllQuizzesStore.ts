import { create } from "zustand";
import axios from "@/lib/axios";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  totalQuestions: number;
  duration: number;
  totalMarks: number;
  isPublished: boolean;
  slug: string;
}

interface AllQuizzesState {
  quizzes: Quiz[];
  loading: boolean;
  error?: string;
  fetchQuizzes: () => Promise<void>;
}

export const useAllQuizzesStore = create<AllQuizzesState>((set) => ({
  quizzes: [],
  loading: false,
  error: undefined,

  fetchQuizzes: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await axios.get("/quiz");
     
      const published = res.data.quizzes.filter((q: Quiz) => q.isPublished);
      set({ quizzes: published, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to fetch quizzes" });
    }
  },
}));
