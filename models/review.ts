import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  user: { type: Schema.Types.ObjectId, ref: "UserProfile" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

export default models.Review || model("Review", ReviewSchema);
