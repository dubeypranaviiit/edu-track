import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  createdCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  progress: [
    {
      course: { type: Schema.Types.ObjectId, ref: "Course" },
      completedItems: [{ type: Schema.Types.ObjectId, ref: "Item" }]
    }
  ]
}, { timestamps: true });

export default models.User || model("User", userSchema);
