import { Schema, model, models } from "mongoose";

const InstructorSchema = new Schema({
  userProfile: { type: Schema.Types.ObjectId, ref: "UserProfile" },
  bio: String,
  expertise: [String],
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String,
  },
  rating: Number
}, { timestamps: true });

export default models.Instructor || model("Instructor", InstructorSchema);
