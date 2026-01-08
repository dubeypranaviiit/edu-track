import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

ReviewSchema.index({ user: 1, course: 1 }, { unique: true }); 

export default models.Review || model("Review", ReviewSchema);
