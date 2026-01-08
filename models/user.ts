import { Schema, model, models, Document } from "mongoose";

export type Role = "student" | "instructor" | "admin";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  stripeCustomerId?: string;
  bio?: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    avatar: String,
    isActive: { type: Boolean, default: true },
    stripeCustomerId: String,
    bio: { type: String, trim: true, maxlength: 500 },
    socialLinks: {
      website: String,
      twitter: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
