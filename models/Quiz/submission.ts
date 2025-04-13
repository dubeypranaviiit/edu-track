// models/submission.ts
import mongoose, { Schema, Document } from "mongoose";

export interface SubmissionDocument extends Document {
  quiz: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  answers: { question: mongoose.Types.ObjectId; selectedOption: number | null }[];
  score: number;
  completedAt: Date;
  timeTaken: Number;
  attemptedAt:Date;
}

const submissionSchema = new Schema<SubmissionDocument>(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        selectedOptionIndex: { type: Number, default: null }, // null if not attempted
        isCorrect: { type: Boolean, default: false },
        markedForReview: { type: Boolean, default: false },
        timeSpent: { type: Number, default: 0 }, // in seconds or milliseconds
      }],
      
      timeTaken: Number,
    score: { type: Number, default: 0 },
    completedAt: { type: Date },
    attemptedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Submission || mongoose.model<SubmissionDocument>("Submission", submissionSchema);
