import { Schema, model, models } from "mongoose";

const AssignmentSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    slug: { type: String, required: true },
    topic: {
      type: String,
      required: true,
    },
    subtopic: {
      type: String,
    },
    type: {
      type: String,
      enum: ["file", "text"],
      required: true,
    },
    // File-based assignment
    fileUrl: {
      type: String,
    },
    fileName: {
      type: String,
    },
    fileType: {
      type: String,
    },
    // Text-based assignment
    textContent: {
      type: String,
    },
    // Uploaded by Instructor (not students)
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Assignment || model("Assignment", AssignmentSchema);
