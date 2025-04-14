// models/question.ts
import mongoose, { Schema, Document } from "mongoose";

export interface QuestionDocument extends Document {
  text: string;
  options: string[];
  correctAnswer: number;
  marks: number;
  negativeMarks?: number;
  correctOptionIndex:number;
  explanation?: string;
  quiz: mongoose.Types.ObjectId;
}

const questionSchema = new Schema<QuestionDocument>(
  {
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOptionIndex: { type: Number, required: true },
    marks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0 },
    explanation: { type: String },
    // quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz"},
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  },
  { timestamps: true }
);

export default mongoose.models.Question || mongoose.model<QuestionDocument>("Question", questionSchema);
