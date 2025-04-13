import { Quiz, Question } from "@/types/quiz";

export const initialState: Quiz = {
  title: "",
  description: "",
  duration: 30,
  totalMarks: 0,
  questions: [],
};

export function quizReducer(state: Quiz, action: any): Quiz {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };

    case "ADD_QUESTION":
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };

    case "UPDATE_QUESTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };

    case "DELETE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload),
      };

    case "REORDER_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };

    case "LOAD_SAVED":
      return { ...action.payload };

    default:
      return state;
  }
}
