import mongoose, { Schema, Document, Types } from "mongoose";

export interface QuestionDocument extends Document {
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks?: number;
  explanation?: string;
  quiz: Types.ObjectId;
}

const questionSchema = new Schema<QuestionDocument>(
  {
    text: { type: String, required: true, trim: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 2,
        message: "A question must have at least two options.",
      },
    },
    correctOptionIndex: {
      type: Number,
      required: true,
      validate: {
        validator: function (this: QuestionDocument, val: number) {
          return val >= 0 && val < this.options.length;
        },
        message: "correctOptionIndex must be a valid option index.",
      },
    },
    marks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0 },
    explanation: { type: String, default: "" },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model<QuestionDocument>("Question", questionSchema);
