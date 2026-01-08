import mongoose, { Schema, Document, Types } from "mongoose";

export interface QuizDocument extends Document {
  title: string;
  slug: string;
  description?: string;
  duration: number; // minutes
  totalMarks: number;
  passingMarks: number;
  totalQuestions: number;
  questions: Types.ObjectId[];
  createdBy: Types.ObjectId; // reference to instructor (User)
  isPublished: boolean;
  maxAttempts: number;
}

const quizSchema = new Schema<QuizDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    duration: { type: Number, required: true, min: 1 }, // minutes
    totalMarks: { type: Number, required: true, min: 1 },
    passingMarks: { type: Number,  min: 0 },
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
