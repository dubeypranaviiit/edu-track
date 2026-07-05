import mongoose, { Schema, Document, Types } from "mongoose";
import "@/models/Quiz/question";

export interface QuizDocument extends Document {
  title: string;
  slug: string;
  description?: string;
  duration: number; 
  totalMarks: number;
  passingMarks: number;
  totalQuestions: number;
  questions: Types.ObjectId[];
  createdBy: Types.ObjectId; 
  isPublished: boolean;
  maxAttempts: number;
}

const quizSchema = new Schema<QuizDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    duration: { type: Number, required: true, min: 1 }, 
    totalMarks: { type: Number, required: true, min: 1 },
    passingMarks: { type: Number, min: 0, max: 100, default: 50 },
    totalQuestions: { type: Number, required: true, min: 1 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    isPublished: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);


export default mongoose.models.Quiz ||
  mongoose.model<QuizDocument>("Quiz", quizSchema);
