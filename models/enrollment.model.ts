// models/Enrollment.ts
import { Schema, model, models } from "mongoose";

const EnrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    payment: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      paymentId: { type: String }, // Stripe payment ID
      status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default models.Enrollment || model("Enrollment", EnrollmentSchema);
