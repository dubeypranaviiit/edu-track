import { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    thumbnail: {type:String} ,// New field for course image
    logo: String, // New field for course logo
    originalPrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    category: String,
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration:{
      type:String, required: true
    },
    features: [String],
    certificate: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }], 
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    totalEnrollments: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to calculate final price after discount
CourseSchema.virtual("finalPrice").get(function () {
  const discount = (this.discountPercent / 100) * this.originalPrice;
  return Math.max(0, this.originalPrice - discount);
});

export default models.Course || model("Course", CourseSchema);
