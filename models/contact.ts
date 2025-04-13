import { Schema, model, models } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    method: {
      type: String,
      enum: ["Email", "Phone", "WhatsApp"],
      required: true,
    },
    message: { type: String },
  },
  { timestamps: true }
);

export default models.ContactMessage || model("ContactMessage", ContactMessageSchema);
