import { Quiz } from "@/types/quiz";

export const validateQuiz = (quiz: Quiz): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!quiz.title.trim()) errors.title = "Title is required.";
  if (!quiz.description.trim()) errors.description = "Description is required.";
  if (quiz.duration <= 0) errors.duration = "Duration must be greater than 0.";
  if (quiz.totalMarks < 0) errors.totalMarks = "Total marks cannot be negative.";
  if (quiz.questions.length === 0) errors.questions = "At least one question is required.";

  quiz.questions.forEach((q, i) => {
    if (!q.text.trim()) errors[`question_${i}_text`] = "Question text is required.";
    if (q.options.length < 2) errors[`question_${i}_options`] = "At least two options required.";
    if (q.correctOption === null || q.correctOption >= q.options.length) {
      errors[`question_${i}_correct`] = "Select a valid correct option.";
    }
  });

  return errors;
};
