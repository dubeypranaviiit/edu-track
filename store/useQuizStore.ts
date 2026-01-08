import { create } from 'zustand';

export interface QuestionInput {
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks: number;
  explanation?: string;
}

interface QuizState {
  title: string;
  description: string;
  duration: number;
  maxAttempts: number;
  passingMarks: number;
  questions: QuestionInput[];

  // setters
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  setDuration: (val: number) => void;
  setMaxAttempts: (val: number) => void;
  setPassingMarks: (val: number) => void;

  // question actions
  addQuestion: (q?: QuestionInput) => void;
  removeQuestion: (index: number) => void;
  updateQuestion: (index: number, field: keyof QuestionInput, value: any) => void;
  updateOption: (qIndex: number, oIndex: number, value: string) => void;

  // reset
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  title: '',
  description: '',
  duration: 0,
  maxAttempts: 1,
  passingMarks: 0,
  questions: [{
    text: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    marks: 1,
    negativeMarks: 0,
    explanation: '',
  }],

  setTitle: (val) => set({ title: val }),
  setDescription: (val) => set({ description: val }),
  setDuration: (val) => set({ duration: val }),
  setMaxAttempts: (val) => set({ maxAttempts: val }),
  setPassingMarks: (val) => set({ passingMarks: val }),

  addQuestion: (q) =>
    set((state) => ({
      questions: [
        ...state.questions,
        q || { text: '', options: ['', '', '', ''], correctOptionIndex: 0, marks: 1, negativeMarks: 0, explanation: '' },
      ],
    })),

  removeQuestion: (index) =>
    set((state) => ({ questions: state.questions.filter((_, i) => i !== index) })),

  updateQuestion: (index, field, value) =>
    set((state) => {
      const updated = [...state.questions];
      updated[index][field] = value;
      return { questions: updated };
    }),

  updateOption: (qIndex, oIndex, value) =>
    set((state) => {
      const updated = [...state.questions];
      updated[qIndex].options[oIndex] = value;
      return { questions: updated };
    }),

  resetQuiz: () =>
    set({
      title: '',
      description: '',
      duration: 0,
      maxAttempts: 1,
      passingMarks: 0,
      questions: [{
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        marks: 1,
        negativeMarks: 0,
        explanation: '',
      }],
    }),
}));
