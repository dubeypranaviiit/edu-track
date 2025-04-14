// models/quiz.ts
import mongoose, { Schema, Document } from "mongoose";

export interface QuizDocument extends Document {
  title: string;
  slug: string;
  description: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  questions: mongoose.Types.ObjectId[];
  createdBy: String;
  isPublished: boolean;
  maxAttempts:Number;
  TotalQuestion:Number;
}

const quizSchema = new Schema<QuizDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    duration: { type: Number, required: true }, // minutes
    totalMarks: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    TotalQuestion:{ type: Number, required: true },
    createdBy: {   type: String,required: true },
    isPublished: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model<QuizDocument>("Quiz", quizSchema);
