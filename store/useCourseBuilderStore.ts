import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface ItemType {
  _id?: string;
  title: string;
  type: "video" | "quiz" | "text" | "assignment";
  content?: string;
  videoUrl?: string;
  duration?: string;
}

export interface SubtopicType {
  _id?: string;
  title: string;
  description?: string;
  items: ItemType[];
}

export interface ChapterType {
  _id?: string;
  title: string;
  description?: string;
  subtopics: SubtopicType[];
}

export interface CourseType {
  _id?: string;
  title: string;
  description?: string;
  slug?: string;
  category?: string;
  level?: string;
  duration?: string;
  originalPrice?: number;
  discountPercent?: number;
  certificate?: boolean;
  features?: string[];
  logo?: string;
  thumbnail?: string;
  isPublished?: boolean;
  chapters: ChapterType[];
}
interface CourseBuilderStore {
  course: CourseType;
  setCourse: (data: Partial<CourseType>) => void;
  resetCourse: () => void;

  addChapter: (chapter: Omit<ChapterType, "_id">) => void;
  updateChapter: (index: number, updated: Partial<ChapterType>) => void;
  deleteChapter: (index: number) => void;

  addSubtopic: (chapterIndex: number, subtopic: Omit<SubtopicType, "_id">) => void;
  updateSubtopic: (chapterIndex: number, subtopicIndex: number, updated: Partial<SubtopicType>) => void;
  deleteSubtopic: (chapterIndex: number, subtopicIndex: number) => void;

  addItem: (chapterIndex: number, subtopicIndex: number, item: Omit<ItemType, "_id">) => void;
  updateItem: (chapterIndex: number, subtopicIndex: number, itemIndex: number, updated: Partial<ItemType>) => void;
  deleteItem: (chapterIndex: number, subtopicIndex: number, itemIndex: number) => void;
}
const initialState: CourseType = {
  title: "",
  description: "",
  slug: "",
  category: "",
  level: "",
  duration: "",
  originalPrice: 0,
  discountPercent: 0,
  certificate: false,
  features: [],
  logo: "",
  thumbnail: "",
  isPublished: false,
  chapters: [],
};
export const useCourseBuilderStore = create<CourseBuilderStore>()(
  persist(
    (set, get) => ({
      course: initialState,

      setCourse: (data) => set({ course: { ...get().course, ...data } }),
      resetCourse: () => set({ course: initialState }),
      addChapter: (chapter) =>
        set({
          course: {
            ...get().course,
            chapters: [...get().course.chapters, { ...chapter, subtopics: [] }],
          },
        }),

      updateChapter: (index, updated) => {
        const chapters = [...get().course.chapters];
        chapters[index] = { ...chapters[index], ...updated };
        set({ course: { ...get().course, chapters } });
      },

      deleteChapter: (index) => {
        const chapters = get().course.chapters.filter((_, i) => i !== index);
        set({ course: { ...get().course, chapters } });
      },
      addSubtopic: (chapterIndex, subtopic) => {
        const chapters = [...get().course.chapters];
        chapters[chapterIndex].subtopics.push({ ...subtopic, items: [] });
        set({ course: { ...get().course, chapters } });
      },
      updateSubtopic: (chapterIndex, subtopicIndex, updated) => {
        const chapters = [...get().course.chapters];
        chapters[chapterIndex].subtopics[subtopicIndex] = {
          ...chapters[chapterIndex].subtopics[subtopicIndex],
          ...updated,
        };
        set({ course: { ...get().course, chapters } });
      },
      deleteSubtopic: (chapterIndex, subtopicIndex) => {
        const chapters = [...get().course.chapters];
        chapters[chapterIndex].subtopics = chapters[chapterIndex].subtopics.filter(
          (_, i) => i !== subtopicIndex
        );
        set({ course: { ...get().course, chapters } });
      },
      addItem: (chapterIndex, subtopicIndex, item) => {
        const chapters = [...get().course.chapters];
        chapters[chapterIndex].subtopics[subtopicIndex].items.push(item);
        set({ course: { ...get().course, chapters } });
      },
      updateItem: (chapterIndex, subtopicIndex, itemIndex, updated) => {
        const chapters = [...get().course.chapters];
        const items = chapters[chapterIndex].subtopics[subtopicIndex].items;
        items[itemIndex] = { ...items[itemIndex], ...updated };
        set({ course: { ...get().course, chapters } });
      },
      deleteItem: (chapterIndex, subtopicIndex, itemIndex) => {
        const chapters = [...get().course.chapters];
        const items = chapters[chapterIndex].subtopics[subtopicIndex].items.filter(
          (_, i) => i !== itemIndex
        );
        chapters[chapterIndex].subtopics[subtopicIndex].items = items;
        set({ course: { ...get().course, chapters } });
      },
    }),
    {
      name: "course-builder-storage", 
    }
  )
);
