import { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    thumbnail: String,
    logo: String,
    originalPrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: String,
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: { type: String, required: true },
    features: [String],
    certificate: { type: Boolean, default: false },
    totalEnrollments: { type: Number, default: 0 },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CourseSchema.virtual("finalPrice").get(function () {
  const discount = (this.discountPercent / 100) * this.originalPrice;
  return Math.max(0, this.originalPrice - discount);
});

export default models.Course || model("Course", CourseSchema);
