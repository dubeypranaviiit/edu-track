import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["video", "reading", "assignment"],
      required: true,
    },
    videoUrl: String,
    content: String,
    resources: [String],
    subtopic: { type: Schema.Types.ObjectId, ref: "Subtopic" }, // Reference to Subtopic ObjectId
  },
  { timestamps: true }
);

export default models.Item || model("Item", ItemSchema);
