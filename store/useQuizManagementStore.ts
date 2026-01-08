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

interface QuizManagementState {
  quizzes: Quiz[];
  loading: boolean;
  error?: string;

  fetchQuizzes: () => Promise<void>;
  deleteQuiz: (slug: string) => Promise<void>;
  togglePublish: (slug: string) => Promise<void>;
  updateQuiz: (slug: string, data: Partial<Quiz>) => Promise<void>;
}

export const useQuizManagementStore = create<QuizManagementState>((set, get) => ({
  quizzes: [],
  loading: false,
  error: undefined,

  fetchQuizzes: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await axios.get("/quiz");
      set({ quizzes: res.data.quizzes, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to fetch quizzes" });
    }
  },

  deleteQuiz: async (slug) => {
    try {
      await axios.delete(`/quiz/${slug}`);
      set({ quizzes: get().quizzes.filter((q) => q.slug !== slug) });
    } catch (err: any) {
      console.error("Delete quiz error:", err);
    }
  },

 togglePublish: async (slug) => {
  try {
    const quiz = get().quizzes.find(q => q.slug === slug);
    if (!quiz) return;

    const res = await axios.patch(`/quiz/${slug}`, { isPublished: !quiz.isPublished });
    set({
      quizzes: get().quizzes.map(q => (q.slug === slug ? res.data.quiz : q))
    });
  } catch (err: any) {
    console.error("Toggle publish error:", err);
  }
},


  updateQuiz: async (slug, data) => {
    try {
      const res = await axios.put(`/quiz/${slug}`, data);
      set({
        quizzes: get().quizzes.map((q) => (q.slug === slug ? res.data.quiz : q)),
      });
    } catch (err: any) {
      console.error("Update quiz error:", err);
    }
  },
}));
