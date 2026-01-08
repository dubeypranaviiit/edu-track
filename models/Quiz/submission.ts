import mongoose, { Schema, Document, Types } from "mongoose";

export interface SubmissionAnswer {
  question: Types.ObjectId;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
  markedForReview: boolean;
  timeSpent: number;
}

export interface SubmissionDocument extends Document {
  quiz: Types.ObjectId;
  user: Types.ObjectId;
  answers: SubmissionAnswer[];
  score: number;
  timeTaken: number; 
  attemptedAt: Date;
  completedAt?: Date;
}

const submissionSchema = new Schema<SubmissionDocument>(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
        selectedOptionIndex: { type: Number, default: null },
        isCorrect: { type: Boolean, default: false },
        markedForReview: { type: Boolean, default: false },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    score: { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 },
    attemptedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

submissionSchema.index({ quiz: 1, user: 1 }); // quick lookup per user per quiz

export default mongoose.models.Submission ||
  mongoose.model<SubmissionDocument>("Submission", submissionSchema);
